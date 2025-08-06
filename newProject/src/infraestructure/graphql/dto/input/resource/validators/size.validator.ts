import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { GetRandomResourceInputDto } from '../get-random.dto';

@ValidatorConstraint({ name: 'SizeGreaterThanInitialIds', async: false })
export class SizeGreaterThanInitialIdsConstraint
  implements ValidatorConstraintInterface
{
  validate(size: number, args: ValidationArguments) {
    const object = args.object as GetRandomResourceInputDto;
    const initialIds: number[] = object.initialIds || [];
    return size >= initialIds.length;
  }

  defaultMessage(args: ValidationArguments) {
    const object = args.object as GetRandomResourceInputDto;
    const initialIds: number[] = object.initialIds || [];
    return `size must be greater than initialIds length (${initialIds.length})`;
  }
}
