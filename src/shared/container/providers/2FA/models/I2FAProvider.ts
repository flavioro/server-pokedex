import IGeneratedSecretDTO from '../dtos/IGeneratedSecretDTO'

export default interface I2FAProvider {
  getTwoFactorAuthenticationCode(codeBase: string): Promise<IGeneratedSecretDTO>;
  respondWithQRCode(otpauth_url: string, callback: (error: Error, url: string) => any ): Promise<string>;
}
