import {Config as IConfig} from "./interfaces/Config";

export class Config {
    private static config: IConfig;

    static get(): IConfig {
        if (!Config.config) {
            Config.config = require('./config.json');
        }

        return Config.config;
    }
}
