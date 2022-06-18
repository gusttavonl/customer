import { Injectable } from '@nestjs/common';
import { CustomerDomain } from '../domain/customer.domain';
import { RedisHelper } from '../../../common/helpers/redis';
import { Customer } from '../domain/customer.entity';
import { UpdateCustomerServiceInterface } from '../interfaces/services/update-customer-service.interface';
import { notFound, ok, HttpResponse } from '../../../common/helpers/http';
import { CUSTOMER_KEY_REDIS } from "../../../common/consts";

@Injectable()
export class UpdateCustomerService implements UpdateCustomerServiceInterface {
  constructor() { }

  async update(id: string, customerDomain: CustomerDomain): Promise<HttpResponse> {
    const redisClient = await RedisHelper.getClient();

    const keyWithIdCustomerToUpdateValues = `${CUSTOMER_KEY_REDIS}:${id}`
    const customerFinded = await redisClient.get(keyWithIdCustomerToUpdateValues);

    if(!customerFinded){
      return notFound("customer not found");
    }

    const updatedCustomer = { ...JSON.parse(customerFinded), ...customerDomain };

    await redisClient.set(
      keyWithIdCustomerToUpdateValues,
      JSON.stringify(updatedCustomer),
    );

    return ok(updatedCustomer as Customer)
  }
}
