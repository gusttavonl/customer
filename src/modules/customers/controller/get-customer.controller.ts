import { Controller, Inject, Get, Param, ParseUUIDPipe, Res } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { TYPES } from "../interfaces/types";
import { GetCustomerApplicationInterface } from "../interfaces/applications/get-customer.application.interface";
import { Customer } from "../domain/customer.entity";
import { Response } from "express";

@Controller("customer")
@ApiTags("Customer")
export class GetCustomerController {
  constructor(
    @Inject(TYPES.applications.GetCustomerApplicationInterface)
    private getCustomerApplication: GetCustomerApplicationInterface
  ) {}

  @ApiOkResponse({
    description: "Get customer by id",
    type: Customer
  })
  @ApiNotFoundResponse({
    description: "Customer was not found"
  })
  @Get(":id")
  async getById(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const response = await this.getCustomerApplication.getById(id);
    return res.status(response.statusCode).json(response.body);
  }
}
