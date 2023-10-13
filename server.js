import fs from 'fs'
import path from 'path';
import multer from 'multer';
import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import deckRoutes from './routes/deckRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __hostname = '11.183.62.50.host.secureserver.net'
dotenv.config()

const app = express();
const PORT = 80;

const upload = multer({ dest: 'public/images' });

mongoose.connect('mongodb://127.0.0.1:27017/learning', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors())

app.post('/image', upload.single('image'), (req, res) => {
    
    const randomName = Math.random().toString(36).substring(7);
    const fileExtension = path.extname(req.file.originalname);
    const fileName = `${randomName}${fileExtension}`;
    const filePath = path.join(__dirname, 'public/images', fileName);
    
    fs.rename(req.file.path, filePath, (error) => {
        if (error) throw error;
        res.json({ fileName:`http://${__hostname}/images/${fileName}` });
    });
});

app.use(express.static('public'))
app.use(express.static('client/build'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/user/', userRoutes)
app.use('/api/deck/', deckRoutes)
app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
