exports.config = {
    user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    key: process.env.BROWSERSTACK_ACC_KEY || 'BROWSERSTACK_ACC_KEY',

    updateJob: false,
    specs: [
        './src/scrape.js'
    ],
    exclude: [],

    capabilities: [{
        'bstack:options' : {
            "os" : "Windows",
            "osVersion" : "10",
            "resolution" : "1920x1080",
            "local" : "false",
            "debug" : "false",
            "video" : "true",
        },
        'browserstack.use_w3c': true,
        "browserName" : "Chrome",
        "project": "google-fonts-json",
        "build": "google-fonts-json"
    }],

    logLevel: 'warn',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    host: 'hub.browserstack.com',
    mochaOpts: {
        ui: 'bdd',
        timeout: 36000000
    },
};