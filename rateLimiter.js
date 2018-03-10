const RateLimit = require("express-rate-limit");

const limiter = new RateLimit({
    windowMs: 30*1000, // 30 seconds
    max: 1000, // limit each IP to 1000 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});

module.exports = limiter;