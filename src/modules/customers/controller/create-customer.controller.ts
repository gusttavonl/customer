import { Controller, Inject, Post, Body, UsePipes, Res } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CustomerDomain } from "../domain/customer.domain";
import { TYPES } from "../interfaces/types";
import { CreateCustomerApplicationInterface } from "../interfaces/applications/create-customer.application.interface";
import { Customer } from "../domain/customer.entity";
import { Response } from "express";
import { ValidationPipe } from "../../../common/helpers/validation";

@Controller("customers")
@ApiTags("Customers")
export class CreateCustomerController {
  constructor(
    @Inject(TYPES.applications.CreateCustomerApplicationInterface)
    private createCustomerApplication: CreateCustomerApplicationInterface
    ) {}

  @ApiCreatedResponse({
    description: "It creates a new customer",
    type: Customer
  })    
  @UsePipes(new ValidationPipe(CustomerDomain))
  @Post()
  async create(@Body() customerDomain: CustomerDomain, @Res() response: Response) {
    const createdCustomerHttpResponse = await this.createCustomerApplication.create(customerDomain);
    return response.status(createdCustomerHttpResponse.statusCode).json(createdCustomerHttpResponse.body);
  }
}
