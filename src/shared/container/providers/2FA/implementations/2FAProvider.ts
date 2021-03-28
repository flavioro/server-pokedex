import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import { injectable } from 'tsyringe';

import I2FAProvider from '../models/I2FAProvider';
import IGeneratedSecretDTO from '../dtos/IGeneratedSecretDTO'

@injectable()
export default class TwoFAProvider implements I2FAProvider {

  public async getTwoFactorAuthenticationCode(
    codeBase: string
  ): Promise<IGeneratedSecretDTO> {
    const secretCode = await speakeasy.generateSecret({
      name: codeBase,
    });

    return {
      otpauth_url: secretCode.otpauth_url,
      base32: secretCode.base32,
    };
  }

  public async respondWithQRCode(
    otpauth_url: string, callback: (error: Error, url: string) => any
  ): Promise<string> {
    return QRCode.toFileStream(callback, otpauth_url);
  }

}


