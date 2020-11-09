import env from 'env-var';

const requiredString = (name: string) => env.get(name).required().asString();

export const PORT = env.get('PORT').asIntPositive() || 3000;
export const LEUMI_USERNAME = requiredString('LEUMI_USERNAME');
export const LEUMI_PASSWORD = requiredString('LEUMI_PASSWORD');
export const MONGO_USER = requiredString('MONGO_USER');
export const MONGO_PASSWORD = requiredString('MONGO_PASSWORD');
export const MONGO_PATH = requiredString('MONGO_PATH');
export const TELEGRAM_BOT_TOKEN = requiredString('TELEGRAM_BOT_TOKEN');
export const TELEGRAM_USER1 = env.get('TELEGRAM_USER1').asIntPositive();