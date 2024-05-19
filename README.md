# Local Proxy

A local proxy is designed for use in local development and testing. For example, if you are redirecting traffic from a local machine through a tunnel, you can forward that URL to another local machine within the local network.

## Usage
### Redirect traffic from https://google.com to http://localhost:8080
```shell
local-proxy --url 'https://google.com' --port 8080
```

### Redirect traffic from http://test.ngrok.io to http://localhost:8000
```shell
local-proxy --url 'http://test.ngrok.io' --port 8000
```