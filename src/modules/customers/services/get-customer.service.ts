import { Injectable } from "@nestjs/common";
import { Customer } from "../domain/customer.entity";
import { GetCustomerServiceInterface } from "../interfaces/services/get-customer-service-interface";
import { RedisHelper } from "../../../common/helpers/redis";
import { HttpResponse, notFound, ok } from "../../../common/helpers/http";

@Injectable()
export class GetCustomerService implements GetCustomerServiceInterface {
  constructor() {}

  async getById(id: string): Promise<HttpResponse> {
    const redisClient = await RedisHelper.getClient();
    const customerKeyRedis = `customers:${id}`;
    const customerFinded = await redisClient.get(customerKeyRedis);
   
    if(!customerFinded){
      return notFound("customer not found");
    }
    
    return ok(JSON.parse(customerFinded) as Customer)
  }
}
