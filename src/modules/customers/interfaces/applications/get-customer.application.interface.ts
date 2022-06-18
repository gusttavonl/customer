import { HttpResponse } from "../../../../common/helpers/http";

export interface GetCustomerApplicationInterface {
  getById(idCustomerToFind: string): Promise<HttpResponse>;
}
