import { Test } from '@nestjs/testing';
import { HttpResponse } from '../../../src/common/helpers/http';
import { Customer } from '../../../src/modules/customers/domain/customer.entity';
import { CreateCustomerApplication } from '../../../src/modules/customers/applications/create-customer.application';
import { CustomerDomain } from '../../../src/modules/customers/domain/customer.domain';
import { CreateCustomerServiceInterface } from '../../../src/modules/customers/interfaces/services/create-customer-service.interface';
import { TYPES } from '../../../src/modules/customers/interfaces/types';

const customerDataDomain: CustomerDomain = {
  name: 'any_name',
  document: 12345678910,
};

const customer: Customer = {
  id: 'any_id',
  name: 'any_name',
  document: 12345678910,
};

const createdCustomerResponse: HttpResponse = {
  statusCode: 201,
  body: customer,
};

class MockCreateCustomerService {
  create = jest.fn().mockResolvedValue(createdCustomerResponse);
}

describe('CreateCustomerApplication', () => {
  let application: CreateCustomerApplication;
  let mockService: CreateCustomerServiceInterface;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        CreateCustomerApplication,
        {
          provide: TYPES.services.CreateCustomerServiceInterface,
          useClass: MockCreateCustomerService,
        },
      ],
    }).compile();

    application = app.get<CreateCustomerApplication>(CreateCustomerApplication);
    mockService = app.get(TYPES.services.CreateCustomerServiceInterface);
  });

  describe('create', () => {
    it('should create customer', async () => {
      const customerCreatedHttpResponse = await application.create(
        customerDataDomain,
      );
      const customerCreated = customerCreatedHttpResponse.body;

      expect(customerCreated.id).not.toBeNull();
      expect(customerCreated.name).toEqual(customerDataDomain.name);
      expect(customerCreated.document).toEqual(customerDataDomain.document);
      expect(mockService.create).toBeCalled();
    });
  });
});
