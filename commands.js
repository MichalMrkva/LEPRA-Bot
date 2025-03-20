import ai_reply from './ai_reply.js';
import gifs from './gifs.js';

export const commands = new Map([
  [ 
    "all", 
    { 
      desc: "Vypíše všechny příkazy",
      func: allC
    }
  ],
  [ 
    "info", 
    { 
      desc: "?",
       func: infoC
    }
  ],
  [ 
    "cože", 
    { 
      desc: "Pošle random čeky gif",
       func: cozeC
    }
  ],
  [ 
    "nword",
    { 
      desc: "N-word?!",
      func: enwordC
    }
  ],
  [ 
    "story",
    { 
      desc: "Sex Čekyho bejvaky s jeho holkou", 
      func: storyC
    },
  ],
  [ 
    "nazor", 
    { 
      desc: "Napiš !nazor \"prompt\". Jako prompt napiš co tě zajímá (Je to GEMINI AI) Pracuji na zlepšení",
      func: nazorC
    },
  ],
]);

function allC(msg) {
  let reply = "**Zde jsou všechny příkazy:**\n\n";
  commands.forEach((value, key) => {
    reply += `!${key} - ${value.desc}\n`;
  })
  msg.reply(reply);
}

function cozeC(msg) { 
  const gif = gifs[Math.floor(Math.random() * gifs.length)];
  msg.reply(gif)
}

function infoC(msg) { 
  msg.reply("Komentátor, zpravodaj, zájemce o válečné konflikty a dění ve světě, hráč, věčný student a především streamer. Streamy (skoro) každý den od 16:00.")
}

function enwordC(msg) { msg.reply('https://www.youtube.com/watch?v=ZUXhbHESRLA&ab_channel=Vojti666ek') }

function storyC(msg) { msg.reply('https://www.youtube.com/watch?v=thtxM_B9lp4&ab_channel=ToNejlep%C5%A1%C3%ADzInternetu') }

async function nazorC(msg) {
  const prompt = extractTextFromCommand(msg.content, "!")
  const reply = await ai_reply(prompt);
  if(reply === null) {
    msg.reply("Jsem tupec a něco se pokazilo");
    return;
  }
  if(reply.length > 2000){
    msg.reply("Jsem tupec a odpověď je delší než 2000 znaků takže ji nemužu poslat");
    return;
  }
  msg.reply(reply);
}

export async function randomReply(msg) {
  const i = Math.floor(Math.random() * 10)

  if(i === 0) {
    const reply = await ai_reply(msg.content);
    if(reply === null) {
      msg.reply("Jsem tupec a něco se pokazilo");
      return;
    }
    if(reply.length > 2000){
      msg.reply("Jsem tupec a odpověď je delší než 2000 znaků takže ji nemužu poslat");
      return;
    }
    msg.reply(reply);
  }
}

function extractTextFromCommand(content, commandPrefix) {
  const text = content.slice(commandPrefix.length).trim();
  return text;
}