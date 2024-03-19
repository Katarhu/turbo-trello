import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { LoginConfig } from "~config/login.config";

@Injectable()
export class EncryptionService {
  encryptPassword(password: string) {
    return bcrypt.hash(password, LoginConfig.bcryptHash);
  }

  comparePasswords(incomingPassword: string, actualPassword: string) {
    return bcrypt.compare(incomingPassword, actualPassword);
  }
}
