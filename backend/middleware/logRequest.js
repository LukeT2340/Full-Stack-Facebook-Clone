const fs = require('fs')

// Log all requests
const logRequest = async (req, res, next) => {
    const timestamp = new Date().toISOString();
    const clientIP = req.ip;
    const method = req.method;
    const url = req.originalUrl;
    const userAgent = req.headers['user-agent'];
    const referer = req.headers.referer;
    const statusCode = res.statusCode;

    const log = {
        timestamp,
        clientIP,
        method,
        url,
        userAgent,
        referer,
        statusCode
    };

    try {
        await fs.promises.appendFile("./log.txt", `${JSON.stringify(log)} \n`);
        console.log("Request logged successfully");
    } catch (error) {
        console.error("Error logging request:", error);
    }
    next();
};

module.exports = logRequest;