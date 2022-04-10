import {Instrument} from "./Instrument";

export interface Config {
    env: string;
    hostname: string;
    instruments: Instrument[];
    db: {
        "host": string,
        "name": string,
        "user": string,
        "password": string,
        "port": number,
        "connectionLimit": number
    }
}
