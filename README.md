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

### Additonal proxy for the API
```shell
local-proxy --url 'http://localhost:8080' --port 8000 --api '/api' 'http://test.ngrok.io'
```
```shell
local-proxy --url 'http://frontend:3000' --port 8080 --api '/api' 'http://backend:8000'
```