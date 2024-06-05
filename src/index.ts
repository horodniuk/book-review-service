import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const index = express();

index.use(cors({ credentials: true }));
index.use(compression());
index.use(cookieParser());
index.use(bodyParser.json());

const server = http.createServer(index);

server.listen(8081, () => {
    console.log('Server running on http://localhost:8081/');
});

const MONGO_URL = 'mongodb+srv://max0100:1234@cluster0.qndyrlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});
mongoose.connection.on('error', (error: Error) => console.log(error));

 index.use('/', router());