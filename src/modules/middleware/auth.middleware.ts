import * as url from "url";
import axios from "axios";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, Request, NextFunction } from "express-serve-static-core";
import { notAvailable, unauthorized } from "../../common/helpers/http";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(request: Request, response: Response, next: NextFunction) {
    try {
      const bearerTokenToValidate = request.headers.authorization;
      const [_, value] = bearerTokenToValidate!.split(' ');
      
      const keyCloakFormDataToValidateToken = {
        token: value,
        client_secret: process.env.CLIENT_SECRET!,
        username: process.env.CLIENT_USERNAME!,
        client_id: process.env.CLIENT_ID!
      };
      
      const keyCloakFormToValidateTokenFormated = new url.URLSearchParams(
        keyCloakFormDataToValidateToken
      ).toString();

      const contentTypeForm =  { "content-type": "application/x-www-form-urlencoded" };

      const keyCloakInstrospesctTokenUrl = process.env
        .KEYCLOAK_INSTROSPECT_URL as string;
      const responseWithInfoToken = await axios.post(
        keyCloakInstrospesctTokenUrl,
        keyCloakFormToValidateTokenFormated,
        {
          headers: contentTypeForm
        }
      );

      const tokenIsActive = responseWithInfoToken.data.active;

      if (!tokenIsActive) {
        return response.status(unauthorized().statusCode).json(unauthorized);
      }

      return next();
      
    } catch (error) {
      return response
        .status(notAvailable().statusCode)
        .json(notAvailable(`sso not avaliable with error: ${error}`).body);
    }
  }
}
