import { v4 as uuidv4 } from "uuid";
import { Injectable } from "@nestjs/common";
import { CustomerDomain } from "../domain/customer.domain";
import { CreateCustomerServiceInterface } from "../interfaces/services/create-customer-service.interface";
import { RedisHelper } from "../../../common/helpers/redis";
import { Customer } from "../domain/customer.entity";
import { created, HttpResponse } from "../../../common/helpers/http";

@Injectable()
export class CreateCustomerService implements CreateCustomerServiceInterface {
  constructor() {}

  async create(customerDomain: CustomerDomain): Promise<HttpResponse> {
    const redisClient = await RedisHelper.getClient();

    const uuidCustomer = uuidv4();
    const newKeyCustomerWithUuid = `customer:${uuidCustomer}`;

    const customerToCreate = {
      id: uuidCustomer,
      ...customerDomain
    };

    await redisClient.set(newKeyCustomerWithUuid, JSON.stringify(customerToCreate));
    
    const createdCustomer = await redisClient.get(newKeyCustomerWithUuid);

    return created(JSON.parse(createdCustomer) as Customer)
  }
}
