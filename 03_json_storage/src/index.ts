import http from 'http';
import express from 'express';
import routes from "./routes";
import {notFound} from "./middlewares/notFound/notFound";
import {errorHandler} from "./middlewares/errorHandler/errorHandler";

const PORT = 3000;
const app = express();
const server = http.createServer(app);

app.set('trust proxy', true);
app.use(express.json());

app.use(routes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        server.listen(PORT, () => {
            console.log(`Server is listening on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

start();
