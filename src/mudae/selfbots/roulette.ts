import { Client, Message } from "discord.js-selfbot-v13";
import { Card, Tu } from "../types";
import Parser from "../parser";
import Action from "../action";
import config from '../../config.json';

class Roulette {
    constructor(
        private client: Client<true>,
        private parser: Parser,
        private action: Action,
    ) {
        this.parser.addParseEventListener('tu', this.handleTu.bind(this));
        this.parser.addParseEventListener('card', this.handleCard.bind(this));
        setTimeout(() => {
            this.action.sendMessage('$tu');
        }, 1000 * 60 * 60);
    }
    handleTu(tu: Tu) {
        if(tu.dailyReady)
            this.action.sendMessage('$daily');
        if(tu.dkReady)  
            this.action.sendMessage('$dk');
        this.roll(tu.rolls);
    }
    handleCard(card: Card, original: Message) {
        if(card.value > config.claimThreshold)
            this.action.addReactionTo(original, config.claimEmoji);
    }
    roll(amount: number) {
        for(let i = 0; i < amount; i ++)
            this.action.sendMessage(config.rollCommand);
    }
}


export default Roulette;