import { Client } from "discord.js-selfbot-v13";
import Parser from "./parser";
import Action from "./action";
import Roulette from "./games/roulette";
import Pokeslot from "./games/pokeslot";


class Selfbot {
    parser; roulette; pokeslot;
    action = new Action();
    constructor(client: Client) {
        this.parser = new Parser(client);
        this.roulette = new Roulette(this.parser, this.action);
        this.pokeslot = new Pokeslot(this.parser, this.action);
    }
}

export default Selfbot;