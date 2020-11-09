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
      bot.telegram.sendMessage(user1Id, txns.toString(), Extra.markup(createKeyboard(txns._id)));
    } else {
      txns.forEach((txn) => {
        bot.telegram.sendMessage(user1Id, txn.toString(), Extra.markup(createKeyboard(txn._id)));
      });
    }
  }
};


const createKeyboard = (id: string) => {
  return Markup.inlineKeyboard([
    Markup.callbackButton('👍', 'approved_' + id),
    Markup.callbackButton('👎', 'notApproved_' + id)
  ]);
}

bot.start((ctx) => ctx.reply('Hello'));
bot.help((ctx) => ctx.reply('Help message'));
bot.action(/^approved_[0-9a-fA-F]{24}$/, (ctx) => {
  const txnId = ctx.callbackQuery?.data?.split('_')[1];
  ctx.deleteMessage();
});
bot.action(/^notApproved_[0-9a-fA-F]{24}$/, (ctx) => ctx.deleteMessage());

bot.launch();
export const startBot = (): void => {
  console.log('TeleBot started!');
};

