import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";



const port_index = process.argv.indexOf("--port");
if (port_index === -1) {
    console.error("Please provide port number to run the proxy server");
    process.exit(1);
}
const PROXY_TO_PORT = parseInt(process.argv[process.argv.indexOf("--port") + 1]);

const url_index = process.argv.indexOf("--url");
if (url_index === -1) {
    console.error("Please provide url to proxy");
    process.exit(1);
}
const PROXY_FROM_URL = process.argv[process.argv.indexOf("--url") + 1];



const app = express();

app.all("*", createProxyMiddleware({ target: PROXY_FROM_URL, changeOrigin: true }));

app.listen(PROXY_TO_PORT, "0.0.0.0", async () => {
    console.log(`start proxy from '${PROXY_FROM_URL}' to 'http://localhost:${PROXY_TO_PORT}'`);
});