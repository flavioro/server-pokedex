import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import { injectable } from 'tsyringe';

import I2FAProvider from '../models/I2FAProvider';
import IGeneratedSecretDTO from '../dtos/IGeneratedSecretDTO'

@injectable()
export default class TwoFAProvider implements I2FAProvider {
  // Validate code user
  public async validateCode(code: string, secretBase32: string): Promise<boolean> {
    const verified = speakeasy.totp.verify({
      secret: secretBase32,
      encoding: 'base32',
      token: code
    })

    return verified
  }

  // Generate code Secret
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

  // QRCode to user
  public async responseWithQRCode(
    otpauth_url: string): Promise<string> {
    const imgqrcode = await QRCode.toDataURL(otpauth_url)

    return imgqrcode
  }
}


