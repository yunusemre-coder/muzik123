import { Client, Collection, Intents } from "discord.js";
import { config } from "./utils/config.js";
import { importCommands } from "./utils/importCommands.js";
import { messageCreate } from "./utils/messageCreate.js";
import express from "express";
import http from "http";
const { TOKEN, PREFIX } = config;


const client = new Client({
  restTimeOffset: 0,
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES
  ]
});

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();

/**
 * Client events
 */
client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`${PREFIX}yardım ve ${PREFIX}play`, { type: "LISTENING" });
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 28000);
/**
 * Import commands
 */
importCommands(client);

/**
 * Message event
 */
messageCreate(client);
