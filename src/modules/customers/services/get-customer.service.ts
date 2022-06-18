import { Injectable } from "@nestjs/common";
import { RedisHelper } from "../../../common/helpers/redis";
import { HttpResponse, notFound, ok } from "../../../common/helpers/http";
import { CUSTOMER_KEY_REDIS } from "../../../common/consts";
import { GetCustomerServiceInterface } from "../interfaces/services/get-customer-service-interface";
@Injectable()
export class GetCustomerService implements GetCustomerServiceInterface {
  constructor() {}

  async getById(idCustomerToFind: string): Promise<HttpResponse> {
    const redisClient = await RedisHelper.getClient();
    const keyRedisWithIdToFindCustomer = `${CUSTOMER_KEY_REDIS}:${idCustomerToFind}`;
    const customerFinded = await redisClient.get(keyRedisWithIdToFindCustomer);
   
    const customerNotFound = !customerFinded
    if(customerNotFound){
      return notFound("customer not found");
    }
    
    return ok(JSON.parse(customerFinded))
  }
}
