import { Injectable, Inject } from '@nestjs/common';
import { HttpResponse } from 'src/common/helpers/http';
import { CustomerDomainWithId } from '../domain/customer.domain';
import { TYPES } from '../interfaces/types';
import { UpdateCustomerApplicationInterface } from '../interfaces/applications/update-customer.application.interface';
import { UpdateCustomerServiceInterface } from '../interfaces/services/update-customer-service.interface';

@Injectable()
export class UpdateCustomerApplication
  implements UpdateCustomerApplicationInterface
{
  constructor(
    @Inject(TYPES.services.UpdateCustomerServiceInterface)
    private updateCustomerService: UpdateCustomerServiceInterface,
  ) {}

  async update(
    idCustomerToUpdate: string,
    customerDataToUpdate: CustomerDomainWithId,
  ): Promise<HttpResponse> {
    return this.updateCustomerService.update(
      idCustomerToUpdate,
      customerDataToUpdate,
    );
  }
}
