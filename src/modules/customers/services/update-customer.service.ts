import { Injectable } from '@nestjs/common';
import { CustomerDomain } from '../domain/customer.domain';
import { RedisHelper } from '../../../common/helpers/redis';
import { Customer } from '../domain/customer.entity';
import { UpdateCustomerServiceInterface } from '../interfaces/services/update-customer-service.interface';
import { notFound, ok, HttpResponse } from '../../../common/helpers/http';

@Injectable()
export class UpdateCustomerService implements UpdateCustomerServiceInterface {
  constructor() { }

  async update(id: string, customerDomain: CustomerDomain): Promise<HttpResponse> {
    const redisClient = await RedisHelper.getClient();

    const customerKeyRedis = `customers:${id}`
    const customerFinded = await redisClient.get(customerKeyRedis);

    if(!customerFinded){
      return notFound("customer not found");
    }

    const updatedCustomer = { ...JSON.parse(customerFinded), ...customerDomain };

    await redisClient.set(
      customerKeyRedis,
      JSON.stringify(updatedCustomer),
    );

    return ok(updatedCustomer as Customer)
  }
}
