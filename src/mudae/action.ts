import { Client, Message, PartialGroupDMChannel, TextChannel } from "discord.js-selfbot-v13";
import config from '../config.json';

class Action {
    queue: Array<() => void> = [];
    constructor(private client: Client<true>) {
        this.processQueue();
    }
    processQueue() {
        this.queue.shift()?.call(this);
        const delay = 1000 / config.actionsPerSecond;
        const randomDelay = Math.random() * config.maxRandomDelay;
        setTimeout(this.processQueue.bind(this), delay + randomDelay);
    }
    addReactionTo(message: Message, emoji: Parameters<Message['react']>[0]) {
        this.queue.push(() => {
            message.react(emoji);
        });
    }
    sendMessage(message: Parameters<TextChannel['send']>[0]) {
        this.queue.push(() => {
            const channel = this.client.channels.cache.get(config.defaultChannelId);
            if(channel?.type === 'GUILD_TEXT')
                channel.send(message);
        });
    }
    sendMessageTo(channel: TextChannel | PartialGroupDMChannel, message: Parameters<TextChannel['send']>[0]) {
        this.queue.push(() => {
            channel.send(message);
        });
    }
}

export default Action;