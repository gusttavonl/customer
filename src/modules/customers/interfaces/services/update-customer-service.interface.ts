import { HttpResponse } from "src/common/helpers/http";
import { CustomerDomainWithId } from "src/modules/customers/domain/customer.domain";

export interface UpdateCustomerServiceInterface {
  update(idCustomerToUpdate: string, customerDataToUpdate: CustomerDomainWithId): Promise<HttpResponse>;
}
