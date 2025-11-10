import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const _config = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET
};

export default _config;

