import { Injectable } from '@nestjs/common';
import { notFound, ok, HttpResponse, conflict } from '../../../common/helpers/http';
import { RedisHelper } from '../../../common/helpers/redis';
import { CUSTOMER_KEY_REDIS } from "../../../common/consts";
import { CustomerDomainWithId } from '../domain/customer.domain';
import { UpdateCustomerServiceInterface } from '../interfaces/services/update-customer-service.interface';

@Injectable()
export class UpdateCustomerService implements UpdateCustomerServiceInterface {
  constructor() { }

  async update(idCustomerToUpdate: string, customerDataToUpdate: CustomerDomainWithId): Promise<HttpResponse> {
    const redisClient = await RedisHelper.getClient();

    const newIdToCustomer = customerDataToUpdate.id
    const idCustomerToUpdateIsEqualNewIdToCustomer = idCustomerToUpdate === newIdToCustomer
    if(idCustomerToUpdateIsEqualNewIdToCustomer){
      return conflict("id conflict");
    }

    const keyWithIdCustomerToUpdateValues = `${CUSTOMER_KEY_REDIS}:${idCustomerToUpdate}`
    const customerFinded = await redisClient.get(keyWithIdCustomerToUpdateValues);

    const customerNotFound = !customerFinded
    if(customerNotFound){
      return notFound("customer not found");
    }

    const updatedCustomer = { ...JSON.parse(customerFinded), ...customerDataToUpdate };

    await redisClient.set(
      keyWithIdCustomerToUpdateValues,
      JSON.stringify(updatedCustomer),
    );

    return ok(updatedCustomer)
  }
}
