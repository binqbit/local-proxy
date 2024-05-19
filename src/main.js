const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { getArgByKey } = require("./utils/args");



const PROXY_TO_PORT = parseInt(getArgByKey("port", true) || 8080);

const PROXY_FROM_URL = getArgByKey("url", true);
if (!PROXY_FROM_URL) {
    console.error("Please provide url to proxy");
    process.exit(1);
}



const app = express();

app.all("*", createProxyMiddleware({ target: PROXY_FROM_URL, changeOrigin: true }));

app.listen(PROXY_TO_PORT, "0.0.0.0", async () => {
    console.log(`start proxy from '${PROXY_FROM_URL}' to 'http://localhost:${PROXY_TO_PORT}'`);
});