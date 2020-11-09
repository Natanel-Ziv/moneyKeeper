import {Telegraf, Markup, Extra} from 'telegraf';
import {TELEGRAM_BOT_TOKEN, TELEGRAM_USER1} from '../framework/environment';
import { TransactionDocument, TransactionTypes } from '../txn/txn.interfaces';


const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
const user1Id = TELEGRAM_USER1;

bot.use((ctx, next) => {
  if(ctx.message?.from?.id === user1Id || ctx.callbackQuery?.message?.from?.is_bot === true) next();
  else ctx.reply('User not allowed to communicate with bot');
});

export const queryAllTxns = (txns: TransactionDocument[] | TransactionDocument): void => {
  if(user1Id !== undefined) {
    if(!Array.isArray(txns)) {
      bot.telegram.sendMessage(user1Id, txns.toString(), Extra.markup(keyboard));
    } else {
      txns.forEach((txn) => {
        bot.telegram.sendMessage(user1Id, txn.toString(), Extra.markup(keyboard));
      });
    }
  }
};


const keyboard = Markup.inlineKeyboard([
  Markup.callbackButton('👍', 'approved'),
  Markup.callbackButton('👎', 'notApproved')
]);

bot.start((ctx) => ctx.reply('Hello'));
bot.help((ctx) => ctx.reply('Help message'));
bot.on('message', (ctx) => {
  if(ctx.chat !== undefined)
    ctx.telegram.sendCopy(ctx.chat.id, ctx.message, Extra.markup(keyboard));
});
bot.action('approved', (ctx) => ctx.deleteMessage());
bot.action('notApproved', (ctx) => ctx.deleteMessage());

bot.launch();
export const startBot = (): void => {
  console.log('TeleBot started!');
};

