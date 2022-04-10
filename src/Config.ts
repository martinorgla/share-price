import {Config as IConfig} from "./interfaces/Config";

export class Config {
    public config: IConfig = require('./config.json');
}
