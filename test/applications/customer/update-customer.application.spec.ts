import { Test } from "@nestjs/testing";
import { Customer } from "src/modules/customers/domain/customer.entity";
import { UpdateCustomerApplication } from "../../../src/modules/customers/applications/update-customer.application";
import { CustomerDomain } from "../../../src/modules/customers/domain/customer.domain";
import { UpdateCustomerServiceInterface } from "../../../src/modules/customers/interfaces/services/update-customer-service.interface";
import { TYPES } from "../../../src/modules/customers/interfaces/types";

const customerDataDomain: CustomerDomain = {
  name: "any_name",
  document: 12345678910
};

const customer: Customer = {
  id: 'any_id',  
  name: "any_name",
  document: 12345678910
};

const updateCustomerResponse = {
  statusCode: 200,
  body: customer
}

class MockUpdateCustomerService {
  update = jest.fn().mockResolvedValue(updateCustomerResponse);
}

describe("UpdateCustomerApplication", () => {
  let application: UpdateCustomerApplication;
  let mockService: UpdateCustomerServiceInterface;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        UpdateCustomerApplication,
        {
          provide: TYPES.services.UpdateCustomerServiceInterface,
          useClass: MockUpdateCustomerService
        }
      ]
    }).compile();

    application = app.get<UpdateCustomerApplication>(UpdateCustomerApplication);
    mockService = app.get(TYPES.services.UpdateCustomerServiceInterface);
  });

  describe("update", () => {
    it("should update customer", async () => {
      const customerUpdatedHttpResponse = await application.update('any_id', customerDataDomain);
      
      const customerUpdated = customerUpdatedHttpResponse.body

      expect(customerUpdated.id).not.toBeNull();
      expect(customerUpdated.name).toEqual(customerDataDomain.name);
      expect(customerUpdated.document).toEqual(customerDataDomain.document);
      expect(mockService.update).toBeCalled();
    });
  });
});
