const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const response = await fetch("https://www.boredapi.com/api/activity")
    const activity = await response.json()

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: activity
    };
}