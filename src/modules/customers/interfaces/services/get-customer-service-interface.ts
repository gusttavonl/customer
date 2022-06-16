import { HttpResponse } from "../../../../common/helpers/http";

export interface GetCustomerServiceInterface {
  getById(id: string): Promise<HttpResponse>;
}
