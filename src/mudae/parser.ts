import { Client, Message } from 'discord.js-selfbot-v13';
import { Argv, Card, MudaeTypeMapping, Tu } from './types';
import config from '../config.json';

type ParseEventCallback<K extends keyof MudaeTypeMapping> = (parsed: MudaeTypeMapping[K], original: Message) => void;

class Parser {
    parseEventListeners: Partial<{
        [K in keyof MudaeTypeMapping]: Array<ParseEventCallback<K>>;
    }> = {};
    constructor(
        private client: Client<true>
    ) {
        this.client.on('messageCreate', this.handleMessage.bind(this));
    }
    addParseEventListener<K extends keyof MudaeTypeMapping>(type: K, callback: ParseEventCallback<K>) {
        if(this.parseEventListeners[type] === undefined)
            this.parseEventListeners[type] = [];
        this.parseEventListeners[type]!.push(callback);
    }
    emitParseEvent<K extends keyof MudaeTypeMapping>(type: K, parsed: MudaeTypeMapping[K], original: Message) {
        this.parseEventListeners[type]?.forEach((callback) => {
            callback(parsed, original);
        });
    }
    handleMessage(message: Message) {
        if(message.author.id === this.client.user.id && message.content.startsWith(config.commandPrefix))
            return this.emitParseEvent('argv', this.parseArgv(message), message);
        if(message.author.id !== config.mudaeId)
            return;
        if(message.content.includes(`**${this.client.user.username}**,`))
            return this.emitParseEvent('tu', this.parseTu(message), message);
        if(message.embeds[0]?.description?.includes('React with any emoji to claim!'))
            return this.emitParseEvent('card', this.parseCard(message), message);
    }
    parseArgv(message: Message): Argv {
        const content = message.content.slice(config.commandPrefix.length);
        return content.match(/((?<=")[^"]+(?=")|[^"\s]+)/g) ?? [];
    }
    parseTu(message: Message): Tu {
        const content = message.content;
        return {
            rolls: getIntBetween(content, 'You have \\*\\*', '\\*\\* rolls? left.'),
            rollResets: getIntBetween(content, 'You have \\*\\*', '\\*\\* rolls? reset in stock.'),
            dailyReady: content.includes('$daily is available!'),
            pReady: content.includes('$p is available!'),
            dkReady: content.includes('$dk is ready!'),
        }
    }
    parseCard(message: Message): Card {
        const embed = message.embeds[0];
        const description = embed.description?.split('\n') ?? [];
        return {
            name: embed.author?.name ?? "",
            series: description[0],
            value: getIntBetween(description[1], '\\*\\*', '\\*\\*'),
        }
    }
}

function getStringBetween(string: string, before: string, after: string) {
    const regex = new RegExp(`(?<=${before}).*(?=${after})`, "g");
    return (string.match(regex) ?? [])[0];
}

function getIntBetween(string: string, before: string, after: string) {
    return parseInt(getStringBetween(string, before, after) ?? '0');
}

export default Parser;