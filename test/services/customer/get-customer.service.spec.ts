import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { notFound } from '../../../src/common/helpers/http';
import { RedisHelper } from '../../../src/common/helpers/redis';
import { CreateCustomerService } from '../../../src/modules/customers/services/create-customer.service';
import { GetCustomerService } from '../../../src/modules/customers/services/get-customer.service';

const makeCustomerDomain = () => ({
  name: 'any_name',
  document: 12345678910,
});

describe('GetCustomerService', () => {
  let redisClient: Redis;

  beforeAll(async () => {
    redisClient = await RedisHelper.getClient(false);
  });

  afterAll(async () => {
    redisClient && (await redisClient.quit());
  });

  describe('get', () => {
    it('should get a created customer', async () => {
      const sutCreateCustomer = new CreateCustomerService();
      const sutGetCustomer = new GetCustomerService();

      const customerDataToCreate = makeCustomerDomain();
      const customerCreatedHttpResponse = await sutCreateCustomer.create(
        customerDataToCreate,
      );
      const customerCreatedId = customerCreatedHttpResponse.body.id;
      const customerFindedHttpResponse = await sutGetCustomer.getById(
        customerCreatedId,
      );
      const customerFindedId = customerFindedHttpResponse.body.id;
      expect(customerCreatedId).toEqual(customerFindedId);
    });

    it('should return not found error', async () => {
      const sutGetCustomer = new GetCustomerService();
      const idNotFound = uuidv4();
      const customerNotFoundHttpResponse = await sutGetCustomer.getById(
        idNotFound,
      );
      const NotFoundWithErrorMessage = notFound('customer not found');
      expect(customerNotFoundHttpResponse.statusCode).toEqual(
        NotFoundWithErrorMessage.statusCode,
      );
      expect(customerNotFoundHttpResponse.body).toEqual(
        NotFoundWithErrorMessage.body,
      );
    });
  });
});
