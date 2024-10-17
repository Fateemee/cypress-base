import cypress = require("cypress");

const fs = require('fs-extra');
const {defineConfig} = require("cypress");
const path = require('path');

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            const file = config.env.configFile || 'dev';
            const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`);
            return fs.readJson(pathToConfigFile)
        }
    }
});
