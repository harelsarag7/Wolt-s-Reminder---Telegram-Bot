const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const token = '6010124037:AAG9MTD6RIIIqnzXgFU8jS0AUAQsrl1gudA';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', msg => {
  const linkRegex = /https:\/\/restaurant-api\.wolt\.com\/v3\/venues\/slug\/\w+/;
  const link = msg.text
  console.log(msg);
  console.log(link);
  if (link) {
    const chatId = msg.chat.id;

    const intervalId = setInterval(() => {
      fetch(link)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          // const deliveryEnabled = data.results[0].delivery_specs.delivery_enabled;
          // if (deliveryEnabled) {
          //   bot.sendMessage(chatId, 'The restaurant is open for delivery!');
          //   clearInterval(intervalId);
          // } else {
          //   bot.sendMessage(chatId, 'The restaurant is closed for delivery. Checking again...');
          // }
        })
        .catch(error => {
          bot.sendMessage(chatId, 'Error checking delivery status. Please try again later.');
          clearInterval(intervalId);
          console.log(error);
        });
    }, 10000);
  }
});
