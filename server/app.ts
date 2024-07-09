require('dotenv').config()

import express from "express";
const cors = require('cors');
const cookieParser = require('cookie-parser');

import UserController from "./controllers/userController";
import UserModel from "./models/userModel";
import UserService from "./services/userService";
import userRoute from "./routes/userRoute";
import QueueController from "./controllers/queueController";
import queueRoute from "./routes/queueRoute";
import QueueModel from "./models/queueModel";
import QueueService from "./services/queueService";
import NewsModel from "./models/newsModel";
import NewsService from "./services/newsService";
import NewsController from "./controllers/newsController";
import newsRoute from "./routes/newsRoute";
import signRoute from "./routes/signRoute";
import authenticateJWT from "./middlewares/authenticateJWT";


const userModel = new UserModel;
const userService = new UserService(userModel);
const userController = new UserController(userService);

const queueModel = new QueueModel;
const queueService = new QueueService(queueModel);
const queueController = new QueueController(queueService);

const newsModel = new NewsModel;
const newsService = new NewsService(newsModel);
const newsController = new NewsController(newsService);

const SERVER_PORT = 3000;
const SERVER_URL = 'localhost';
export const SECRET_KEY = 'qwerty';
export const SESSION_DURATION = '6h'; // Длительность сессии
export const SALT_ROUNDS = 10;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}))
app.use('/api', userRoute(userController));
app.use('/api', signRoute(userController));
app.use('/api', authenticateJWT, queueRoute(queueController));
app.use('/api', authenticateJWT, newsRoute(newsController));

app.listen(SERVER_PORT, SERVER_URL, () => {
	console.log('started on link: https://localhost:3000')
});

// console.log(process.env.SMTP_PASSWORD)