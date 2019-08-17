exports.config = {
    output: './output',
    helpers: {
        Puppeteer: {
            url: 'http://localhost:3010/',
            show: !process.env.CI,
            headless: !!process.env.CI,
        }
    },
    include: {
        I: './steps_file.js'
    },
    mocha: {},
    bootstrap: null,
    teardown: null,
    hooks: [],
    gherkin: {
        features: './features/*.feature',
        steps: [
            './step_definitions/login',
            './step_definitions/register',
            './step_definitions/addRecipe',
            './step_definitions/addFeedback',
        ]
    },
    plugins: {
        screenshotOnFail: {
            enabled: true
        }
    },
    tests: './*_test.js',
    name: 'tests'
};

