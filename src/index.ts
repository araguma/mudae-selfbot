import { Client } from "discord.js-selfbot-v13";
import Selfbot from "./mudae/selfbot";
import config from './config.json';

const client = new Client({
    checkUpdate: false,
});

client.on('ready', (client) => {
    console.log(`Mudae Selfbot for ${client.user.username} is online`);
});

client.on('update', () => {
    throw new Error(`discord.js-selfbot-v13 is outdated`);
})

client.login(config.token);

new Selfbot(client);