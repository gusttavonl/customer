import * as url from "url";
import axios from "axios";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, Request, NextFunction } from "express-serve-static-core";
import { notAvailable, unauthorized } from "../../common/helpers/http";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization
      const [_, value] = token!.split(' ');
      
      const keyGloakFormDataToValidateToken = {
        token: value,
        client_secret: process.env.CLIENT_SECRET!,
        username: process.env.CLIENT_USERNAME!,
        client_id: process.env.CLIENT_ID!
      };
      
      const keyGloakFormToValidateTokenFormated = new url.URLSearchParams(
        keyGloakFormDataToValidateToken
      ).toString();

      const keyGloakInstrospesctTokenUrl = process.env
        .KEYGLOACK_INSTROSPECT_URL as string;
      const response = await axios.post(
        keyGloakInstrospesctTokenUrl,
        keyGloakFormToValidateTokenFormated,
        {
          headers: { "content-type": "application/x-www-form-urlencoded" }
        }
      );

      const tokenIsActive = response.data.active;

      if (!tokenIsActive) {
        return res.status(unauthorized().statusCode).json(unauthorized);
      }

      return next();
      
    } catch (error) {
      return res
        .status(notAvailable().statusCode)
        .json(notAvailable(`sso not avaliable with error: ${error}`));
    }
  }
}
