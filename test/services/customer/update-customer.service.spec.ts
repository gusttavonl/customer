import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { CustomerDomainWithId } from '../../../src/modules/customers/domain/customer.domain';
import { conflict, notFound } from '../../../src/common/helpers/http';
import { RedisHelper } from '../../../src/common/helpers/redis';
import { CreateCustomerService } from '../../../src/modules/customers/services/create-customer.service';
import { UpdateCustomerService } from '../../../src/modules/customers/services/update-customer.service';

const makeCustomerDomain = () => ({
  name: 'any_name',
  document: 12345678910,
});

describe('UpdateCustomerService', () => {
  let redisClient: Redis;

  beforeAll(async () => {
    redisClient = await RedisHelper.getClient(false);
  });

  afterAll(async () => {
    redisClient && (await redisClient.quit());
  });

  describe('update', () => {
    it('should update customer', async () => {
      const sutCreateCustomer = new CreateCustomerService();
      const sutUpdateCustomer = new UpdateCustomerService();

      const customerDataToCreate = makeCustomerDomain();
      const customerCreatedHttpResponse = await sutCreateCustomer.create(
        customerDataToCreate,
      );

      const newUuidCustomerToUpdate = uuidv4();
      const customerDataToUpdate: CustomerDomainWithId = {
        id: newUuidCustomerToUpdate,
        name: 'updated_name',
        document: 10987654321,
      };

      const customerCreatedId = customerCreatedHttpResponse.body.id;
      const customerUpdatedHttpResponse = await sutUpdateCustomer.update(
        customerCreatedId,
        customerDataToUpdate,
      );

      const customerUpdated = customerUpdatedHttpResponse.body;

      expect(customerUpdated.id).toEqual(newUuidCustomerToUpdate);
      expect(customerUpdated.name).toEqual(customerDataToUpdate.name);
      expect(customerUpdated.document).toEqual(customerDataToUpdate.document);
    });

    it('should return not found', async () => {
      const sutUpdateCustomer = new UpdateCustomerService();

      const customerDataToUpdate: CustomerDomainWithId = {
        id: uuidv4(),
        name: 'updated_name',
        document: 10987654321,
      };

      const customerNotCreatedIdNotFound = uuidv4();
      const customerNotUpdatedHttpResponse = await sutUpdateCustomer.update(
        customerNotCreatedIdNotFound,
        customerDataToUpdate,
      );

      const NotFoundWithErrorMessage = notFound('customer not found');
      expect(customerNotUpdatedHttpResponse.statusCode).toEqual(
        NotFoundWithErrorMessage.statusCode,
      );
      expect(customerNotUpdatedHttpResponse.body).toEqual(
        NotFoundWithErrorMessage.body,
      );
    });

    it('should return conflict', async () => {
      const sutCreateCustomer = new CreateCustomerService();
      const sutUpdateCustomer = new UpdateCustomerService();

      const customerDataToCreate = makeCustomerDomain();
      const customerCreatedHttpResponse = await sutCreateCustomer.create(
        customerDataToCreate,
      );

      const customerDataToCauseConflict = makeCustomerDomain();
      const customerDataToCauseConflictHttpResponse =
        await sutCreateCustomer.create(customerDataToCauseConflict);

      const customerCreatedId = customerCreatedHttpResponse.body.id;
      const customerDataToCauseConflictId =
        customerDataToCauseConflictHttpResponse.body.id;

      const customerDataToUpdate: CustomerDomainWithId = {
        id: customerDataToCauseConflictId,
        name: 'updated_name',
        document: 10987654321,
      };

      const customerNotUpdatedWithConflictHttpResponse =
        await sutUpdateCustomer.update(customerCreatedId, customerDataToUpdate);

      const conflictWithErrorMessage = conflict('id conflict');
      expect(customerNotUpdatedWithConflictHttpResponse.statusCode).toEqual(
        conflictWithErrorMessage.statusCode,
      );
      expect(customerNotUpdatedWithConflictHttpResponse.body).toEqual(
        conflictWithErrorMessage.body,
      );
    });
  });
});
