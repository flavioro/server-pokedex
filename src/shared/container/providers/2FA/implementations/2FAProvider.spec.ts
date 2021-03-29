import "reflect-metadata"
import http from 'http'
import TwoFAProvider from './2FAProvider'

let generateCodeSecret: TwoFAProvider
const baseCode = 'IAmDevsBest2021'

describe('Generate code secret', () => {
  beforeEach(() => {
    generateCodeSecret = new TwoFAProvider()
  })

  it('should be able to Generate Code Secret', async () => {
    const secret = await generateCodeSecret.getTwoFactorAuthenticationCode(
      baseCode
    )

    expect(secret).toHaveProperty('otpauth_url')
    expect(secret).toHaveProperty('base32')
  });

  it('should be able to Generate QRCode', async () => {
    const secret = await generateCodeSecret.getTwoFactorAuthenticationCode(
      baseCode
    )

    const qrcode = await generateCodeSecret.responseWithQRCode(secret.otpauth_url)

    await expect(qrcode).toContain("data:image")
  });

  // it('should be able to validate Code user', async () => {
  //   const secret = await generateCodeSecret.getTwoFactorAuthenticationCode(
  //     baseCode
  //   )

  //   const qrcode = await generateCodeSecret.responseWithQRCode(secret.otpauth_url)

  //   await http.createServer(function (req, res) {
  //     res.write('<html><head></head><body>');
  //     res.write(`<img src=${qrcode} />`);
  //     res.end('</body></html>');
  //   }).listen(1337);

  //   const isValid = await generateCodeSecret.validateCode('123')
  //   await expect(isValid).toBe(true)
  // });


});
