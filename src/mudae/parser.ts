import { Client, Message } from "discord.js-selfbot-v13";
import { Argv, Card, ParsedMessageTypeMapping } from "./types";

type ParseEventCallback<T> = (parsedMessage: T) => void;

class Parser {
    parseEventListeners: Partial<{
        [K in keyof ParsedMessageTypeMapping]: Array<ParseEventCallback<ParsedMessageTypeMapping[K]>>;
    }> = {};
    constructor(client: Client) {
        client.on('messageCreate', this.processMessage);
    }
    addParseEventListener<K extends keyof ParsedMessageTypeMapping>(type: K, callback: ParseEventCallback<ParsedMessageTypeMapping[K]>) {
        if(this.parseEventListeners[type] === undefined)
            this.parseEventListeners[type] = [];
        this.parseEventListeners[type]!.push(callback);
    }
    emitParseEvent<K extends keyof ParsedMessageTypeMapping>(type: K, parsedMessage: ParsedMessageTypeMapping[K]) {
        if(this.parseEventListeners[type] === undefined)
            return;
        this.parseEventListeners[type]!.forEach((callback) => {
            callback(parsedMessage);
        });
    }
    processMessage(message: Message) {

    }
    parseArgv(): Argv {

    }
    parseCard(): Card {
        
    }
}

export default Parser;