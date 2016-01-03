/**
 * Created by josh on 1/2/2016.
 */
exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        'e2e/*.js'
    ],
    multiCapabilities: [{
        'browserName': 'chrome'
    },{
        'browserName': 'firefox'
    }],

    baseUrl: 'http://localhost:9000/',

    framework: 'jasmine',
    directConnect: true,
    chromeOnly: true,

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};