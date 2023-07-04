import { Client } from 'discord.js-selfbot-v13';
import { Argv } from '../types';
import Parser from '../parser';
import Action from '../action';
import Mudae from './mudae';

class Command {
    constructor(
        private client: Client<true>,
        private parser: Parser,
        private action: Action,
        private selfbots: Mudae['selfbots']
    ) {
        this.parser.addParseEventListener('argv', this.handleArgv.bind(this));
    }
    handleArgv(argv: Argv) {
        switch(argv[0]) {
            case 'roll':
                this.selfbots.roulette.roll(parseInt(argv[1]) ?? 0);
        }
    }
}

export default Command;