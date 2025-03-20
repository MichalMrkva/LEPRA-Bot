import dotenv from 'dotenv';
import {commands, randomReply} from './commands.js';
dotenv.config();

import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
});

client.login(process.env.DISCORD_TOKEN);

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;

  if (msg.content.startsWith('!')) {
    const commandName = msg.content.slice(1).split(' ')[0];
    if (commands.has(commandName)) {
      console.log(`Command ${msg.content} was called by ${msg.author.username}`);
      commands.get(commandName).func(msg);
      return;
    }
  };
  
  await randomReply(msg);
});

console.log('Bot is running...');