import {Instrument} from "./Instrument";

export interface Config
{
    hostname: string;
    instruments: Instrument[];
}