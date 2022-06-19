import { Injectable } from '@nestjs/common';
import { notFound, ok, HttpResponse, conflict } from '../../../common/helpers/http';
import { RedisHelper } from '../../../common/helpers/redis';
import { CUSTOMER_KEY_REDIS } from "../../../common/consts";
import { CustomerDomainWithId } from '../domain/customer.domain';
import { UpdateCustomerServiceInterface } from '../interfaces/services/update-customer-service.interface';

@Injectable()
export class UpdateCustomerService implements UpdateCustomerServiceInterface {
  async update(idCustomerToUpdate: string, customerDataToUpdate: CustomerDomainWithId): Promise<HttpResponse> {
    const redisClient = await RedisHelper.getClient();
   
    const allCustomersKey = await redisClient.keys(`${CUSTOMER_KEY_REDIS}:*`);
    const newIdToCustomer = customerDataToUpdate.id;
    const keyWithNewIdCustomer = `${CUSTOMER_KEY_REDIS}:${newIdToCustomer}`;
    const newIdCustomerExistsOnCustomerKeys = allCustomersKey.includes(keyWithNewIdCustomer);
    
    const idCustomerToUpdateIsDifferentOfNewIdCustomer = idCustomerToUpdate !== newIdToCustomer;
    const newIdCustomerAlreadyExistsOnCustomerKeys = idCustomerToUpdateIsDifferentOfNewIdCustomer && newIdCustomerExistsOnCustomerKeys;
    if(newIdCustomerAlreadyExistsOnCustomerKeys){
      return conflict("id conflict");
    }

    const keyWithIdCustomerToUpdateValues = `${CUSTOMER_KEY_REDIS}:${idCustomerToUpdate}`;
    const customerFinded = await redisClient.get(keyWithIdCustomerToUpdateValues);

    const customerNotFound = !customerFinded;
    if(customerNotFound){
      return notFound("customer not found");
    }

    const updatedCustomer = { ...JSON.parse(customerFinded), ...customerDataToUpdate };

    await redisClient.set(
      keyWithNewIdCustomer,
      JSON.stringify(updatedCustomer),
    );

    if(idCustomerToUpdateIsDifferentOfNewIdCustomer){
      const oldKeyWithCustomerUpdatedId = keyWithIdCustomerToUpdateValues;
      await redisClient.del(
        oldKeyWithCustomerUpdatedId,
      );
    }

    return ok(updatedCustomer);
  }
}
