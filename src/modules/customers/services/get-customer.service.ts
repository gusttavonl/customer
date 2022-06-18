import { Injectable } from "@nestjs/common";
import { Customer } from "../domain/customer.entity";
import { GetCustomerServiceInterface } from "../interfaces/services/get-customer-service-interface";
import { RedisHelper } from "../../../common/helpers/redis";
import { HttpResponse, notFound, ok } from "../../../common/helpers/http";
import { CUSTOMER_KEY_REDIS } from "../../../common/consts";

@Injectable()
export class GetCustomerService implements GetCustomerServiceInterface {
  constructor() {}

  async getById(id: string): Promise<HttpResponse> {
    const redisClient = await RedisHelper.getClient();
    const keyRedisWithIdToFindCustomer = `${CUSTOMER_KEY_REDIS}:${id}`;
    const customerFinded = await redisClient.get(keyRedisWithIdToFindCustomer);
   
    if(!customerFinded){
      return notFound("customer not found");
    }
    
    return ok(JSON.parse(customerFinded) as Customer)
  }
}
