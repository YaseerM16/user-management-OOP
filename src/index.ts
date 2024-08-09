import express from 'express';
import nocache from 'nocache';
import session from 'express-session';
import { connectDb } from "./infrastructure/db";
import dotenv from "dotenv";
import userRoute from './interfaces/Routes/UserRoute'
import adminRoute from './interfaces/Routes/AdminRoute'
dotenv.config();

connectDb();

const app = express();
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(nocache());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')


app.use('/', userRoute)
app.use('/', adminRoute)


app.listen(3000, () => {
    console.log('Server started on port 3000');
});