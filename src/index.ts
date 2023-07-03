import { Client } from "discord.js-selfbot-v13";
import Mudae from "./mudae/selfbots/mudae";
import config from './config.json';

const client = new Client({
    checkUpdate: false,
});

client.on('ready', (client) => {
    new Mudae(client);
    console.log(`Mudae Selfbot for ${client.user.username} is online`);
})

client.on('update', () => {
    throw new Error(`discord.js-selfbot-v13 package is outdated`)
})

client.login(config.token);