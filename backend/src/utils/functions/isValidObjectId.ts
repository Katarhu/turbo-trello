import { ObjectId } from "bson";

import { isValueDefined } from "./isValueDefined";

export function isValidObjectId(possibleObjectId?: string): boolean {
  if (!isValueDefined(possibleObjectId)) return false;

  return ObjectId.isValid(possibleObjectId);
}
