import { HttpResponse } from "src/common/helpers/http";
import { CustomerDomain } from "src/modules/customers/domain/customer.domain";

export interface UpdateCustomerApplicationInterface {
  update(id: string, customerDomain: CustomerDomain): Promise<HttpResponse>;
}
