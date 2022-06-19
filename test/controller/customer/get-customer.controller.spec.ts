import * as httpMocks from 'node-mocks-http';
import { Test, TestingModule } from "@nestjs/testing";
import { Response } from "express-serve-static-core";
import { GetCustomerController } from "../../../src/modules/customers/controller/get-customer.controller";
import { GetCustomerApplicationInterface } from "../../../src/modules/customers/interfaces/applications/get-customer.application.interface";
import { TYPES } from "../../../src/modules/customers/interfaces/types";
import { HttpResponse } from '../../../src/common/helpers/http';

const customer = {
  id: 'any_id',
  name: "any_name",
  document: 12345678910
};

const getCustomerHttpResponse: HttpResponse = {
  statusCode: 200,
  body: customer
}

class GetCustomerApplicationMock {
  getById = jest.fn().mockResolvedValue(getCustomerHttpResponse);
}

describe("Get Customer Controller", () => {
  let controller: GetCustomerController;
  let getCustomerAppMock: GetCustomerApplicationInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetCustomerController],
      providers: [
        {
          provide: TYPES.applications.GetCustomerApplicationInterface,
          useClass: GetCustomerApplicationMock
        },
      ]
    }).compile();

    controller = module.get<GetCustomerController>(GetCustomerController);
    getCustomerAppMock = module.get(TYPES.applications.GetCustomerApplicationInterface);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getById", () => {
    it("should get customer", async () => {
      const httpResponseMock = httpMocks.createResponse() as Response;
      jest.spyOn(getCustomerAppMock, "getById");

      const customerFindedHttpResponse = await controller.getById(customer.id, httpResponseMock);
      expect(customerFindedHttpResponse.statusCode).toBe(getCustomerHttpResponse.statusCode);
      expect(getCustomerAppMock.getById).toBeCalled();
    });
  });
});
