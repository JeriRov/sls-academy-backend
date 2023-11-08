import 'dotenv/config';
import http from 'http';
import express from 'express';
import routes from "./routes";
import {notFound} from "./middlewares/notFound/notFound";
import {errorHandler} from "./middlewares/errorHandler/errorHandler";
import {connectToMongo} from "./db";

const app = express();
const server = http.createServer(app);

app.set('trust proxy', true);
app.use(express.json());

app.use(routes);

app.use(notFound);
app.use(errorHandler);
const start = async () => {
    try {
        await connectToMongo();
        server.listen(3000, () => {
            console.log('Server is listening on port http://localhost:3000');
        });
    } catch (error) {
        console.error(error);
    }
};

start();
