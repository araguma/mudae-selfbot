import { Message, TextChannel } from "discord.js-selfbot-v13";
import config from '../config.json';

class Action {
    queue: Array<() => void> = [];
    constructor() {
        setInterval(this.processNextAction, 1000 / config.actionsPerSecond);
    }
    processNextAction() {
        this.queue.shift()?.call(this);
    }
    addReactionTo(message: Message, emoji: Parameters<Message['react']>[0]) {
        this.queue.push(() => {
            message.react(emoji);
        })
    }
    sendMessage(channel: TextChannel, message: Parameters<TextChannel['send']>[0]) {
        this.queue.push(() => {
            channel.send(message);
        });
    }
}

export default Action;