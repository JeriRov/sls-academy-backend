import * as dotenv from 'dotenv';
import http from 'http';
import express from 'express';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());

server.listen(3000, () => {
    console.log('Server is listening on port http://localhost:3000');
});
