import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import path from 'node:path';

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/uv/', express.static(uvPath));

app.use((req, res) => {
    res.status(404).send("Error: Route not found.");
});

server.listen(PORT, () => {
    console.log(`theproxywhoise is running on port ${PORT}`);
});
