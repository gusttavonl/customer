import { HttpResponse } from "../../../../common/helpers/http";

export interface GetCustomerServiceInterface {
  getById(idCustomerToFind: string): Promise<HttpResponse>;
}
