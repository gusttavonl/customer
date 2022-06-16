import { HttpResponse } from "src/common/helpers/http";
import { CustomerDomain } from "../../domain/customer.domain";

export interface CreateCustomerServiceInterface {
  create(customerDomain: CustomerDomain): Promise<HttpResponse>;
}
