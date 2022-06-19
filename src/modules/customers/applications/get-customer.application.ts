import { Injectable, Inject } from '@nestjs/common';
import { HttpResponse } from '../../../common/helpers/http';
import { GetCustomerApplicationInterface } from '../interfaces/applications/get-customer.application.interface';
import { GetCustomerServiceInterface } from '../interfaces/services/get-customer-service-interface';
import { TYPES } from '../interfaces/types';

@Injectable()
export class GetCustomerApplication implements GetCustomerApplicationInterface {
  constructor(
    @Inject(TYPES.services.GetCustomerServiceInteface)
    private getCustomerService: GetCustomerServiceInterface,
  ) {}

  async getById(idCustomerToFind: string): Promise<HttpResponse> {
    return this.getCustomerService.getById(idCustomerToFind);
  }
}
