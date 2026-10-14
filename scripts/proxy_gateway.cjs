const http = require('http');

function createProxy(port, targetPort) {
  const server = http.createServer((req, res) => {
    const options = {
      hostname: 'localhost',
      port: targetPort,
      path: req.url,
      method: req.method,
      headers: {
        ...req.headers,
        host: `localhost:${targetPort}`
      }
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end(`Bad Gateway: Unable to reach Vite at http://localhost:${targetPort}\n${err.message}`);
    });

    req.pipe(proxyReq, { end: true });
  });

  server.on('upgrade', (req, socket, head) => {
    // Forward WebSockets for Vite HMR
    const proxyReq = http.request({
      hostname: 'localhost',
      port: targetPort,
      path: req.url,
      method: req.method,
      headers: {
        ...req.headers,
        host: `localhost:${targetPort}`
      }
    });

    proxyReq.on('upgrade', (proxyRes, proxySocket, proxyHead) => {
      socket.write(`HTTP/${req.httpVersion} 101 Switching Protocols\r\n`);
      for (const [key, value] of Object.entries(proxyRes.headers)) {
        socket.write(`${key}: ${value}\r\n`);
      }
      socket.write('\r\n');
      proxySocket.pipe(socket);
      socket.pipe(proxySocket);
    });

    proxyReq.on('error', () => {
      socket.destroy();
    });

    proxyReq.end();
  });

  server.listen(port, () => {
    console.log(`[GATEWAY] Forwarding http://localhost:${port} -> http://localhost:${targetPort}`);
  });

  server.on('error', (err) => {
    console.warn(`[GATEWAY] Port ${port} unavailable: ${err.message}`);
  });
}

createProxy(5173, 5174);
createProxy(3000, 5174);
