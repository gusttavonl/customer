import * as httpMocks from 'node-mocks-http';
import { v4 as uuidv4 } from "uuid";
import { Response } from 'express';
import { Test, TestingModule } from "@nestjs/testing";
import { UpdateCustomerController } from "../../../src/modules/customers/controller/update-customer.controller";
import { UpdateCustomerApplicationInterface } from "../../../src/modules/customers/interfaces/applications/update-customer.application.interface";
import { TYPES } from "../../../src/modules/customers/interfaces/types";
import { HttpResponse } from '../../../src/common/helpers/http';
import { Customer } from '../../../src/modules/customers/domain/customer.entity';
import { CustomerDomainWithId } from '../../../src/modules/customers/domain/customer.domain';

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

const updatedCustomerHttpResponse: HttpResponse = {
  statusCode: 200,
  body: customer
}

class UpdateCustomerApplicationMock {
  update = jest.fn().mockResolvedValue(updatedCustomerHttpResponse);
}

describe("Update Customer Controller", () => {
  let controller: UpdateCustomerController;
  let updateCustomerAppMock: UpdateCustomerApplicationInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateCustomerController],
      providers: [
        {
          provide: TYPES.applications.UpdateCustomerApplicationInterface,
          useClass: UpdateCustomerApplicationMock
        },
      ]
    }).compile();

    controller = module.get<UpdateCustomerController>(UpdateCustomerController);
    updateCustomerAppMock = module.get(TYPES.applications.UpdateCustomerApplicationInterface);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("update", () => {
    it("should update customer", async () => {
      const httpResponseMock = httpMocks.createResponse() as Response;
      jest.spyOn(updateCustomerAppMock, "update");

      const customerUpdatedHttpResponse = await controller.update(customer.id, customerDomainWithId, httpResponseMock)
      expect(customerUpdatedHttpResponse.statusCode).toEqual(updatedCustomerHttpResponse.statusCode);
      expect(updateCustomerAppMock.update).toBeCalled();
    });
  });
});
