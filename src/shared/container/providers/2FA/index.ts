import { container } from 'tsyringe';

import I2FAProvider from './models/I2FAProvider';

import TwoFAProvider from './implementations/2FAProvider';

container.registerSingleton<I2FAProvider>(
  'TwoFAProvider',
  TwoFAProvider,
);
