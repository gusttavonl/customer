import { plainToClass } from 'class-transformer';
import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';

@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor(
        private classToValidateAgainst: Function,
        private validationOptions: ValidatorOptions = {}
    ) { }

    async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
        if (!metatype || this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object, {
            whitelist: true,
            forbidNonWhitelisted: true,
            ...this.validationOptions,
        });

        if (errors.length > 0) {
            const constraints: { [type: string]: string }[] = [];

            const findConstraints = (err: ValidationError): void => {
                if (err.constraints) constraints.push(err.constraints);
            };

            errors.forEach(err => findConstraints(err));

            throw new BadRequestException(
                'Validation Failed',
                constraints
                    .flatMap(constraint => Object.values(constraint))
                    .join(', ')
            );
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [this.classToValidateAgainst];
        return !types.includes(metatype);
    }
}