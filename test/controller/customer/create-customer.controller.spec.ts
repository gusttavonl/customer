import * as httpMocks from 'node-mocks-http';
import { Test, TestingModule } from "@nestjs/testing";
import { CreateCustomerController } from "../../../src/modules/customers/controller/create-customer.controller";
import { CreateCustomerApplicationInterface } from "../../../src/modules/customers/interfaces/applications/create-customer.application.interface";
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

const createdCustomerResponse: HttpResponse = {
  statusCode: 201,
  body: customer
}

class CreateCustomerApplicationMock {
  create = jest.fn().mockResolvedValue(createdCustomerResponse);
}

describe("Create Customer Controller", () => {
  let controller: CreateCustomerController;
  let createCustomerAppMock: CreateCustomerApplicationInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCustomerController],
      providers: [
        {
          provide: TYPES.applications.CreateCustomerApplicationInterface,
          useClass: CreateCustomerApplicationMock
        },
      ]
    }).compile();

    controller = module.get<CreateCustomerController>(CreateCustomerController);
    createCustomerAppMock = module.get(TYPES.applications.CreateCustomerApplicationInterface);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create customer", async () => {
      const httpResponseMock = httpMocks.createResponse() as Response;
      jest.spyOn(createCustomerAppMock, "create");

      const customerCreatedHttpResponse = await controller.create(customerDataDomain, httpResponseMock)
      expect(customerCreatedHttpResponse.statusCode).toEqual(createdCustomerResponse.statusCode);
      expect(createCustomerAppMock.create).toBeCalled();
    });
  });
});
