import express from 'express'
import bodyParser from 'body-parser'
import mongoose, { trusted } from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { futimesSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
 
const app = express()
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(helmet.crossOriginResourcePolicy({
    policy : 'cross-origin'
}))
app.use(bodyParser.json({
    limit:'30mb',
    extended: true
}))
app.use(bodyParser.urlencoded({
    limit :'30mb',
    extended:true
}))
app.use(cors())
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

const storage = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null, 'public/assets')
    },
    filename: function(req, file, cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage})

const port = process.env.PORT || 8081
const url = process.env.URL

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(port, () => console.log(`http://localhost:${port}`))
}).catch((err)=> console.log(err))
