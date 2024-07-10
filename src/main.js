const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { getFlagByKey, getArgByKey, getArgsValuesByKey } = require("./utils/args");



const PROXY_TO_PORT = parseInt(getArgByKey("port", true) || 8080);

const PROXY_FROM_URL = getArgByKey("url", true);
if (!PROXY_FROM_URL) {
    console.error("Please provide url to proxy");
    process.exit(1);
}

const FOLLOW_REDIRECTS = getFlagByKey("redirect", true);

const ADDITIONAL_PROXY = getArgsValuesByKey("api", 2, true).map(([path, target]) => ({ path: path, target: target }));



const app = express();

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

for (const { path, target } of ADDITIONAL_PROXY) {
    app.use(path, createProxyMiddleware({ target, changeOrigin: true, pathRewrite: { [`^${path}`]: '', autoRewrite: true }, followRedirects: FOLLOW_REDIRECTS }));
}

app.all("*", createProxyMiddleware({ target: PROXY_FROM_URL, changeOrigin: true, autoRewrite: true, followRedirects: FOLLOW_REDIRECTS }));



app.listen(PROXY_TO_PORT, "0.0.0.0", async () => {
    console.log(`start proxy from '${PROXY_FROM_URL}' to 'http://localhost:${PROXY_TO_PORT}'`);
    for (const { path, target } of ADDITIONAL_PROXY) {
        console.log(`add additional proxy from '${path}' to '${target}'`);
    }
    console.log(`follow redirects: ${FOLLOW_REDIRECTS}`);
});