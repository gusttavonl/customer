import { Module } from '@nestjs/common';
import { CreateCustomerService } from './services/create-customer.service';
import { CreateCustomerApplication } from './applications/create-customer.application';
import { TYPES } from './interfaces/types';
import { GetCustomerApplication } from './applications/get-customer.application';
import { UpdateCustomerApplication } from './applications/update-customer.application';
import { GetCustomerService } from './services/get-customer.service';
import { UpdateCustomerService } from './services/update-customer.service';
import { GetCustomerController } from './controller/get-customer.controller';
import { CreateCustomerController } from './controller/create-customer.controller';
import { UpdateCustomerController } from './controller/update-customer.controller';

const createCustomerApplication = {
  provide: TYPES.applications.CreateCustomerApplicationInterface,
  useClass: CreateCustomerApplication,
};

const getCustomerApplication = {
  provide: TYPES.applications.GetCustomerApplicationInterface,
  useClass: GetCustomerApplication,
};

const updateCustomerApplication = {
  provide: TYPES.applications.UpdateCustomerApplicationInterface,
  useClass: UpdateCustomerApplication,
};

const createCustomerService = {
  provide: TYPES.services.CreateCustomerServiceInterface,
  useClass: CreateCustomerService,
};

const getCustomerService = {
  provide: TYPES.services.GetCustomerServiceInteface,
  useClass: GetCustomerService,
};

const updateCustomerService = {
  provide: TYPES.services.UpdateCustomerServiceInterface,
  useClass: UpdateCustomerService,
};

@Module({
  controllers: [
    CreateCustomerController,
    GetCustomerController,
    UpdateCustomerController,
  ],
  providers: [
    createCustomerApplication,
    createCustomerService,
    getCustomerApplication,
    getCustomerService,
    updateCustomerApplication,
    updateCustomerService,
  ],
  exports: [createCustomerService, getCustomerService, updateCustomerService],
})
export class CustomersModule {}
