export type Argv = string[];
export type Card = {
    name: string,
    series: string,
    value: number,
}
export type ParsedMessageTypeMapping = {
    argv: Argv,
    card: Card,
}