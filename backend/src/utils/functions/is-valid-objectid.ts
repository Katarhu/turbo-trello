import { ObjectId } from "bson";

import { isValueDefined } from "./is-value-defined";

export function isValidObjectId(possibleObjectId?: string): boolean {
  if (!isValueDefined(possibleObjectId)) return false;

  return ObjectId.isValid(possibleObjectId);
}
