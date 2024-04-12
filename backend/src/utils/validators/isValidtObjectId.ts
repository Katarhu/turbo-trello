import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

import { isValidObjectId } from "~utils/functions/isValidObjectId";

@ValidatorConstraint({ name: "isValidObjectId", async: false })
export class IsValidObjectId implements ValidatorConstraintInterface {
  validate(possibleObjectId: string) {
    return isValidObjectId(possibleObjectId);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should be valid objectId`;
  }
}
