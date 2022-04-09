import {Instrument} from "./Instrument";

export interface Config
{
    apiKey: string;
    apiUrl: string;
    instruments: Instrument[];
}