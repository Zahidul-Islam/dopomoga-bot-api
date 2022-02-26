const express = require("express");
const { Telegraf, Scenes, session } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.launch()

const needRideScene = new Scenes.WizardScene(
    "need-ride-scene", // first argument is Scene_ID, same as for BaseScene
    (ctx) => {
        ctx.reply('You will get a ride! Let me get more information');
        ctx.reply('What is your first name and last name?');
        return ctx.wizard.next();
    },
    (ctx) => {
      ctx.wizard.state.name = ctx.message.text;
      ctx.reply('Where are you now?');
      return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.location = ctx.message.text;
        ctx.reply('Where are you going?');
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.destination = ctx.message.text;
        ctx.reply('Departing date?');
        return ctx.wizard.next();
    },
    (ctx) => {
      ctx.wizard.state.departDate = ctx.message.text;
      ctx.reply('Number of people?');
      return ctx.wizard.next();
    }, 
    (ctx) => {
        ctx.wizard.state.numPeople = ctx.message.text;
        ctx.reply('Thank you for your replies, we\'ll contact your soon. Meanwhile, stay strong and safe!');
        ctx.reply("Hi! Your name is: " +  ctx.wizard.state.name);
        ctx.reply("Your location is: " + ctx.wizard.state.location);
        return ctx.scene.leave();
    },
  );

const stage = new Scenes.Stage([needRideScene], { default: 'need-ride-scene' });
stage.command('cancel', (ctx) => {
    ctx.reply("Operation canceled");
    return ctx.scene.leave();
});
bot.use(session());
bot.use(stage.middleware())

bot.hears('/need_ride', async (ctx) => {
    await Scenes.Stage.enter('need-ride-scene');
})


bot.hears('/add_driver', (ctx) => ctx.reply('I can give you a ride!'))

const router = express.Router();

module.exports = router;