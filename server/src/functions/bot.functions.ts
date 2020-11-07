import {Telegraf} from 'telegraf';
import {TELEGRAM_BOT_TOKEN} from '../framework/environment';


const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
export const startBot = (): void => {
  console.log('TeleBot started!');
};
