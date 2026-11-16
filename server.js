import express from 'express';
import { createServer } from 'node:http';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';
import { libcurlPath } from '@mercuryworkshop/libcurl-transport';
import { scramjetPath } from '@mercuryworkshop/scramjet/path';
import { logging, server as wisp } from '@mercuryworkshop/wisp-js/server';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 8080;
const publicPath = fileURLToPath(new URL('./public/', import.meta.url));

logging.set_level(logging.NONE);

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.use(express.static(publicPath));
app.use('/scram/', express.static(scramjetPath));
app.use('/libcurl/', express.static(libcurlPath));
app.use('/baremux/', express.static(baremuxPath));

app.use((req, res) => {
    res.status(404).send("Error: Route not found.");
});

server.on('upgrade', (req, socket, head) => {
    if (new URL(req.url, `http://${req.headers.host}`).pathname === '/wisp/') {
        wisp.routeRequest(req, socket, head);
    } else {
        socket.destroy();
    }
});

server.listen(PORT, () => {
    console.log(`theproxywhoise is running on port ${PORT}`);
});
