import express from 'express'
import indexRouter from './routes/index.js'
import path from 'path'
import ejs from 'ejs'

import { dirname } from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 4040

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())
    .engine("html", ejs.renderFile)
    .set('views', 'views')
    .set('view engine', 'html')
    .use('/', indexRouter)
    .listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));