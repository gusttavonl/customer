import * as httpMocks from 'node-mocks-http';
import { Test, TestingModule } from "@nestjs/testing";
import { UpdateCustomerController } from "../../../src/modules/customers/controller/update-customer.controller";
import { UpdateCustomerApplicationInterface } from "../../../src/modules/customers/interfaces/applications/update-customer.application.interface";
import { TYPES } from "../../../src/modules/customers/interfaces/types";
import { Response } from 'express';
import { HttpResponse } from '../../../src/common/helpers/http';

const customerDataDomain = {
  name: "any_name",
  document: 12345678910
};

const customer = {
  id: 'any_id',
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

      const customerUpdatedHttpResponse = await controller.update(customer.id, customerDataDomain, httpResponseMock)
      expect(customerUpdatedHttpResponse.statusCode).toEqual(updatedCustomerHttpResponse.statusCode);
      expect(updateCustomerAppMock.update).toBeCalled();
    });
  });
});
