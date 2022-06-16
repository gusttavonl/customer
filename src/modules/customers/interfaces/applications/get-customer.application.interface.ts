import { HttpResponse } from "../../../../common/helpers/http";

export interface GetCustomerApplicationInterface {
  getById(id: string): Promise<HttpResponse>;
}
