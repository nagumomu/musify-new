import { Client, Intents } from "discord.js";
import { Bot } from "./structs/Bot";
import express, { Express, Request, Response } from 'express';

export const bot = new Bot(
  new Client({
    restTimeOffset: 0,
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.DIRECT_MESSAGES
    ]
  })
);

const app: Express = express();
app.get('/', (req: Request, res: Response) => {
  res.send('Express Server');
});
app.listen("8080", () => {
  console.log(`⚡️[server]: Server is running at http://localhost:8080`);
});