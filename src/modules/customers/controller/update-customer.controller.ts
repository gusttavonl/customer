import {
  Controller,
  Inject,
  Body,
  Param,
  ParseUUIDPipe,
  Put,
  Res
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CustomerDomainWithId } from "../domain/customer.domain";
import { TYPES } from "../interfaces/types";
import { UpdateCustomerApplicationInterface } from "../interfaces/applications/update-customer.application.interface";
import { Customer } from "../domain/customer.entity";
import { Response } from "express";

@Controller("customers")
@ApiTags("Customers")
export class UpdateCustomerController {
  constructor(
    @Inject(TYPES.applications.UpdateCustomerApplicationInterface)
    private updateCustomerApplication: UpdateCustomerApplicationInterface
  ) {}

  @ApiOkResponse({
    description: "It updated a customer",
    type: Customer
  })
  @Put(":id")
  async update(
    @Param("id", new ParseUUIDPipe()) idCustomerToUpdate: string,
    @Body() customerDataToUpdate: CustomerDomainWithId,
    @Res() response: Response,
  ) {
    const updatedCustomerHttpResponse = await this.updateCustomerApplication.update(
      idCustomerToUpdate,
      customerDataToUpdate
    );
    return response.status(updatedCustomerHttpResponse.statusCode).json(updatedCustomerHttpResponse.body);
  }
}
