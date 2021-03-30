import { injectable, inject } from 'tsyringe';
import TwoFAProvider from '../../../shared/container/providers/2FA/implementations/2FAProvider'
import AppError from '../../../shared/errors/AppError';

const baseCode = 'WeAreDevsBest2021'

@injectable()
class TwoFAService {
  public async execute(): Promise<string> {
    const twoFA = new TwoFAProvider()

    //Generate code secret
    const secret = await twoFA.getTwoFactorAuthenticationCode(
      baseCode
    )
    if (!secret) {
      throw new AppError('Error to generate code', 401);
    }

    // Generate QRCode
    const qrcode = await twoFA.responseWithQRCode(secret.otpauth_url)

    return qrcode
  }
}

export default TwoFAService;
