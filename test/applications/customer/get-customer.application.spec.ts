import { Test } from "@nestjs/testing";
import { GetCustomerApplication } from "../../../src/modules/customers/applications/get-customer.application";
import { TYPES } from "../../../src/modules/customers/interfaces/types";
import { Customer } from "../../../src/modules/customers/domain/customer.entity";
import { GetCustomerServiceInterface } from "src/modules/customers/interfaces/services/get-customer-service-interface";

const customer: Customer = {
  id: 'any_id',
  name: "any_name",
  document: 12345678910
};

class MockGetCustomerService {
  getById = jest.fn().mockResolvedValue(customer);
}


describe("GetUserApplication", () => {
  let application: GetCustomerApplication;
  let service: GetCustomerServiceInterface;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        GetCustomerApplication,
        {
          provide: TYPES.services.GetCustomerServiceInteface,
          useClass: MockGetCustomerService
        }
      ]
    }).compile();

    service = app.get(TYPES.services.GetCustomerServiceInteface);
    application = app.get<GetCustomerApplication>(GetCustomerApplication);
  });

  describe("getById", () => {
    it("should get customer by id", async () => {
      const customerFindedHttpResponse = await application.getById(customer.id)
      expect(customerFindedHttpResponse).toEqual(customerFindedHttpResponse);
    });
  });
});
