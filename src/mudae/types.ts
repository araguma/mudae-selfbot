export type Argv = string[];
export type Tu = {
    rolls: number,
    rollResets: number,
    dailyReady: boolean,
    pReady: boolean,
    dkReady: boolean,
}
export type Card = {
    name: string,
    series: string,
    value: number,
}
export type MudaeTypeMapping = {
    argv: Argv,
    tu: Tu,
    card: Card,
}