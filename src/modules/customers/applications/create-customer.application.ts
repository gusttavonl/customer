import { Injectable, Inject } from "@nestjs/common";
import { CustomerDomain } from "../domain/customer.domain";
import { TYPES } from "../interfaces/types";
import { CreateCustomerServiceInterface } from "../interfaces/services/create-customer-service.interface";
import { CreateCustomerApplicationInterface } from "../interfaces/applications/create-customer.application.interface";
import { HttpResponse } from "../../../common/helpers/http";

@Injectable()
export class CreateCustomerApplication
  implements CreateCustomerApplicationInterface {
  constructor(
    @Inject(TYPES.services.CreateCustomerServiceInterface)
    private createCustomerService: CreateCustomerServiceInterface
  ) {}

  async create(customerDomain: CustomerDomain): Promise<HttpResponse> {
    return this.createCustomerService.create(customerDomain);
  }
}
