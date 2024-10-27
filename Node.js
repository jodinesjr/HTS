const http = require('http');
const https = require('https');

const proxycurlApiKey = 'qZpCyKnvBz7dclOrS1SYHA'; // Substitua pelo seu token

const proxyServer = http.createServer((req, res) => {
    const targetUrl = `https://nubela.co/proxycurl/api/v2/linkedin?url=${req.url.split('?')[1]}&extra=include&use_cache=if-present&fallback_to_cache=on-error`;
    const options = {
        hostname: 'nubela.co',
        port: 443,
        path: `/proxycurl/api/v2/linkedin?url=${req.url.split('?')[1]}&extra=include&use_cache=if-present&fallback_to_cache=on-error`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${proxycurlApiKey}`,
            'Origin': 'http://127.0.0.1:5500',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    };

    const targetRequest = https.request(options, (targetResponse) => {
        res.writeHead(targetResponse.statusCode, targetResponse.headers);
        targetResponse.pipe(res);
    });

    targetRequest.on('error', (error) => {
        console.error('Proxy server error:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Proxy server error');
    });

    targetRequest.end();
});

proxyServer.listen(8080, () => {
    console.log('Proxy server listening on port 8080');
});