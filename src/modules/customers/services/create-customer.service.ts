import { v4 as uuidv4 } from "uuid";
import { Injectable } from "@nestjs/common";
import { CustomerDomain } from "../domain/customer.domain";
import { CreateCustomerServiceInterface } from "../interfaces/services/create-customer-service.interface";
import { RedisHelper } from "../../../common/helpers/redis";
import { Customer } from "../domain/customer.entity";
import { created, HttpResponse } from "../../../common/helpers/http";
import { CUSTOMER_KEY_REDIS } from "../../../common/consts";

@Injectable()
export class CreateCustomerService implements CreateCustomerServiceInterface {
  constructor() {}

  async create(customerDataDomainToCreate: CustomerDomain): Promise<HttpResponse> {
    const redisClient = await RedisHelper.getClient();

    const uuidCustomer = uuidv4();
    const newKeyWithIdToCreateCustomer = `${CUSTOMER_KEY_REDIS}:${uuidCustomer}`;

    const customerToCreate = {
      id: uuidCustomer,
      ...customerDataDomainToCreate
    };

    await redisClient.set(newKeyWithIdToCreateCustomer, JSON.stringify(customerToCreate));
    
    const createdCustomer = await redisClient.get(newKeyWithIdToCreateCustomer);

    return created(JSON.parse(createdCustomer))
  }
}
