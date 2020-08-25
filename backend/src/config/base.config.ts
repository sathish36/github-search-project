// Load environment variables from .env file
import { config as loadEnvConfig } from 'dotenv';
import { IConfig } from '../interfaces';

loadEnvConfig();

export abstract class BaseConfig implements IConfig {
    public HOST: string = process.env.APP_HOST || 'localhost';

    public PORT: number = parseInt(process.env.APP_PORT || '8080', 10);

    public REDIS_CACHE_TTL: number = parseInt(process.env.REDIS_CACHE_TTL || '0', 10);

    /**
     * This is the host used to Connect to the Redis
     */
    public REDIS_HOST: string = process.env.REDIS_HOST || '';

    /**
     * This is the post used to Connect to the Redis
     */
    public REDIS_PORT: number = parseInt(process.env.REDIS_PORT || '0', 10);

    public CLIENT_PATH: string = process.env.CLIENT_PATH || '';

    public API_END_POINTS = {
        USERS: 'https://api.github.com/search/users',
        REPOSITORIES: 'https://api.github.com/search/repositories',
        ISSUES: 'https://api.github.com/search/issues',
    };
}
