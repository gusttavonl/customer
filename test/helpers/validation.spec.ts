import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationPipe } from '../../src/common/helpers/validation';
import { badRequest } from '../../src/common/helpers/http';

class TestDomain {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  document: number;

}

describe('ValidationPipe', () => {
  let validationPipe: ValidationPipe;
  const customer: TestDomain = {
    name: 'any_name',
    document: 12345678910,
  };

  describe('when data is not valid', () => {
    it('should throw error', done => {
      validationPipe = new ValidationPipe(TestDomain);
      const newCustomer = {
        name: 'any_name',
        document: 'document_string',
      };

      validationPipe
        .transform(newCustomer, {
          data: '',
          type: 'body',
          metatype: TestDomain,
        })
        .then(() => done('Error, Should not get here'))
        .catch(error => {
          expect(error.response.message).toEqual('Validation Failed');
          expect(error.status).toBe(badRequest(error).statusCode);
          done();
        });
    });
     
  });

  describe('when no transform needed', () => {
    it('should get the data', async () => {
      validationPipe = new ValidationPipe(TestDomain);
      const obj = { test: 'any' };
      const value = await validationPipe.transform(obj, {
        data: '',
        type: 'body',
        metatype: String,
      });
      expect(value).toEqual(obj);
    });
  });

  describe('when send domain object', () => {
    it('needs to validate', async () => {
      validationPipe = new ValidationPipe(TestDomain);
      const value = await validationPipe.transform(customer, {
        data: '',
        type: 'body',
        metatype: TestDomain,
      });
      expect(value).toEqual(customer);
    });
  });
});