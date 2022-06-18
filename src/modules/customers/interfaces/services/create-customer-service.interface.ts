import { HttpResponse } from "src/common/helpers/http";
import { CustomerDomain } from "../../domain/customer.domain";

export interface CreateCustomerServiceInterface {
  create(customerDataDomainToCreate: CustomerDomain): Promise<HttpResponse>;
}
