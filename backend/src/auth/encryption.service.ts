import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { AuthConstants } from "~core/constants/auth.constants";

@Injectable()
export class EncryptionService {
  encryptPassword(password: string) {
    return bcrypt.hash(password, AuthConstants.bcryptHash);
  }

  comparePasswords(incomingPassword: string, actualPassword: string) {
    return bcrypt.compare(incomingPassword, actualPassword);
  }
}
