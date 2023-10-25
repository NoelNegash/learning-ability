import fs from 'fs'
import path from 'path';
import multer from 'multer';
import https from 'https';
import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import deckRoutes from './routes/deckRoutes.js'
import drillRoutes from './routes/drillRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()
const options = {
    key: fs.readFileSync('certs/private.key'),
    cert: fs.readFileSync('certs/certificate.crt')
};
const app = express();
const PORT = 443;

const upload = multer({ dest: 'public/images' });

mongoose.connect('mongodb://127.0.0.1:27017/learning', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors({
    origin: ['https://localhost', 'https://localhost:3000'],
    credentials: true
}))

app.post('/image', upload.single('image'), (req, res) => {
    
    const randomName = Math.random().toString(36).substring(7);
    const fileExtension = path.extname(req.file.originalname);
    const fileName = `${randomName}${fileExtension}`;
    const filePath = path.join(__dirname, 'public/images', fileName);
    
    fs.rename(req.file.path, filePath, (error) => {
        if (error) throw error;
        res.json({ fileName:`/images/${fileName}` });
    });
});

app.use(express.static('public'))
app.use(express.static('client/build'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/user/', userRoutes)
app.use('/api/deck/', deckRoutes)
app.use('/api/drill/', drillRoutes)
app.use(notFound)
app.use(errorHandler)
app.use((req, res, next) => {
    if (req.secure) {
        next();
    } else {
        res.redirect(`https://${req.headers.host}${req.url}`);
    }
});

https.createServer(options, app).listen(PORT);