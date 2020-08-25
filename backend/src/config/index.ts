import { config as loadEnvConfig } from 'dotenv';

import { development } from './development.config';
import { production } from './production.config';
import { staging } from './staging.config';
import { test } from './test.config';
import { ConfigType } from '../types';
import { IConfig } from '../interfaces';

loadEnvConfig();

let env: string | undefined = process.env.NODE_ENV;

const configs: ConfigType = {
    development,
    production,
    staging,
    test
};

if (!env || !configs[env]) {
    console.error(`Configuration not found for ${env}, forcing to use development`);
    env = 'development';
}

export const Config: IConfig = configs[env];
