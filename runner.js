const newman = require('newman')
const path = require('path')

const collectionList = path.join(__dirname, 'collection/MockProject.postman_collection.json')
const environmentConfig  = path.join(__dirname, 'environment/EnvironmentA.postman_environment.json')

newman.run({
    collection: collectionList,
    iterationData: [{ "var": "data", "var_beta": "other_val" }],
    environment: environmentConfig,
    iterationCount: 1,
    // envVar: [
    //     { "key": "secret", "value": "secretValue" },
    //     { "key": "anotherSecret", "value": "".concat(process.env.ANOTHER_SECRET) }
    // ]
    reporters: ['allure'],
    reporter: {
        allure: {
            export: './reports/data',
            clean: true
        }

    }
}).on('start', function (err, args) {
    console.log('running a collection...');
}).on('done', function (err, summary) {
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
});
