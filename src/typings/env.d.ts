declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_PORT: number;
    DATABASE_URL: string;
    REDIS_URL: string;
    NODE_ENV: 'dev' | 'prod' | 'test';
  }
}
