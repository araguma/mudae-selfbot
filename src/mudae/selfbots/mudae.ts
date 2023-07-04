import { Client, Message } from 'discord.js-selfbot-v13';
import Action from '../action';
import Roulette from './roulette';
import Pokeslot from './pokeslot';
import Parser from '../parser';
import Command from './command';

const selfbots = {
    Roulette,
    Pokeslot
};

class Mudae {
    parser; action; command;
    selfbots: {
        [K in keyof typeof selfbots as Uncapitalize<K>]: InstanceType<typeof selfbots[K]>;
    };
    constructor(client: Client<true>) {
        this.parser = new Parser(client);
        this.action = new Action(client);
        this.selfbots = Object.fromEntries(Object.entries(selfbots).map(([name, Selfbot]) => {
            return [uncapitalize(name), new Selfbot(client, this.parser, this.action)];
        })) as Mudae['selfbots'];
        this.command = new Command(client, this.parser, this.action, this.selfbots);
    }
}

function uncapitalize<T extends string>(string: T): Uncapitalize<T> {
    return string[0].toLowerCase() + string.slice(1) as Uncapitalize<T>;
}

export default Mudae;