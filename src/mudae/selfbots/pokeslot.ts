import { Client } from "discord.js-selfbot-v13";
import { Tu } from "../types";
import Parser from "../parser";
import Action from "../action";

class Pokeslot {
    constructor(
        private client: Client<true>,
        private parser: Parser,
        private action: Action,
    ) {
        this.parser.addParseEventListener('tu', this.handleTu.bind(this));
    }
    handleTu(tu: Tu) {
        if(tu.pReady)
            this.action.sendMessage('$p');
    }
}

export default Pokeslot;