const { logInput, logResult } = require("./logging");

module.exports = { middlewares: [logInput, logResult] };
