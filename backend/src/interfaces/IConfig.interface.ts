export type IConfig = {
    PORT: number;
    HOST: string;
    REDIS_CACHE_TTL: number;
    REDIS_HOST: string;
    REDIS_PORT: number;
    CLIENT_PATH: string;
    API_END_POINTS: {
        [key: string]: string;
    };
};
