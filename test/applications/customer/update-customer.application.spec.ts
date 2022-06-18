import { Test } from "@nestjs/testing";
import { v4 as uuidv4 } from "uuid";
import { Customer } from "src/modules/customers/domain/customer.entity";
import { UpdateCustomerApplication } from "../../../src/modules/customers/applications/update-customer.application";
import { CustomerDomainWithId } from "../../../src/modules/customers/domain/customer.domain";
import { UpdateCustomerServiceInterface } from "../../../src/modules/customers/interfaces/services/update-customer-service.interface";
import { TYPES } from "../../../src/modules/customers/interfaces/types";

const customerDomainWithId: CustomerDomainWithId = {
  id: uuidv4(),
  name: "any_name",
  document: 12345678910
};

const customer: Customer = {
  id: uuidv4(),  
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
      const customerUpdatedHttpResponse = await application.update('any_id', customerDomainWithId);
      
      const customerUpdated = customerUpdatedHttpResponse.body

      expect(customerUpdated.id).not.toBeNull();
      expect(customerUpdated.name).toEqual(customerDomainWithId.name);
      expect(customerUpdated.document).toEqual(customerDomainWithId.document);
      expect(mockService.update).toBeCalled();
    });
  });
});
