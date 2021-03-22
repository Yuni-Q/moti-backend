export interface EnvData {
    APP_ENV: string;
    AWSAccessKeyId: string;
    AWSSecretKey: string;
    buket: string;
    privateKey: string;
    TZ: string;
    DB_USERNAME: string;
    DB_HOST: string;
    DB_PASSWORD: string;
    DSN: string;
    DATABASE: string;
    PORT: number;
}
export declare class EnvService {
    private vars;
    constructor();
    read(): EnvData;
    isDev(): boolean;
    isProd(): boolean;
}
