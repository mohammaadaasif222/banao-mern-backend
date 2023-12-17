import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import morgan from 'morgan';
import cors from 'cors'
import {fileURLToPath} from 'url'
import path from 'path';
import {createPost} from './controllers/posts.js'
import {connectDataBase} from "./config/database.js";
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import { verifyToken } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: "config/config.env" });
const app = express();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan('common'));
app.use(bodyParser.json({limit:"30mb",extended : true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended : true}))
app.use(cors())

app.use('/assets', express.static(path.join(__dirname,"public/assets")));

const storage = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null, "public/assets");
    },
    filename:function (req , file, cb){
        cb(null, file.originalname);
    }
})

const upload = multer({ storage })

app.post('/api/posts', verifyToken, upload.single('picture'), createPost);
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
// database connection
mongoose.set("strictQuery", true);
connectDataBase();

const PORT = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "PRODUCTION") {
//   console.log("hello prod");
//   app.use(express.static(path.join(__dirname, "./build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../build/index.html"));
//   });
// }

// Server runnig 
const server = app.listen(PORT, () => {
    console.log(`Server is starting on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
