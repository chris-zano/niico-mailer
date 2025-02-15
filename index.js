import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import path, { dirname } from 'path';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { routes } from './index.routes.js';

const _filename = fileURLToPath(import.meta.url);
const __dirname = dirname(_filename);

const app = express();
const server = createServer(app);

dotenv.config();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const username = encodeURIComponent(process.env.MONGO_DB_USERNAME);
const password = encodeURIComponent(process.env.MONGO_DB_PASSWORD);
const clusterName = encodeURIComponent(process.env.CLUSTER_NAME);
const appName = encodeURIComponent(process.env.APP_NAME);
const databasename = encodeURIComponent(process.env.DATABASE_NAME);


const uri = `mongodb+srv://${username}:${password}@${clusterName}.jwscxvu.mongodb.net/${databasename}?retryWrites=true&w=majority&appName=${appName}`;

const local_uri = "mongodb://localhost:27017/project_boat";

(async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to database");

        const PORT = process.env.PORT || 8080;
        server.listen(PORT, () => {
            console.log(`App is live on port ${PORT}`);
            console.log(`You can run the app on http://localhost:${PORT}`);
        });
        
        routes(app);

    } catch (error) {
        console.error('Error connecting to Database: ', error);
    }
})();

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('process terminated. closing database connection');
        connection.end();
    });
});