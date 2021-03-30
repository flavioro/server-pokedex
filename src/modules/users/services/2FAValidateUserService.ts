import { injectable } from 'tsyringe';
import TwoFAProvider from '../../../shared/container/providers/2FA/implementations/2FAProvider'
import AppError from '../../../shared/errors/AppError';

const baseCode = 'WeAreDevsBest2021'

@injectable()
class TwoFAService {
  public async execute({ code, User }): Promise<boolean> {
    const twoFA = new TwoFAProvider()



    //Search value secretBase32
    const secretBase32: string = ""

    return twoFA.validateCode(code, secretBase32)
  }
}

export default TwoFAService;
