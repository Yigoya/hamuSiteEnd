import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from "morgan";
import path from 'path'
import { fileURLToPath } from "url";
import multer from "multer";
import authRouter from './router/auth.js'
import itemRouter from './router/item.js'
import { createItem } from "./controller/item.js";
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,"public/assets")))
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "public/assets"));
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    // Sets saved filename(s) to be original filename(s)
  })
  
// Set saved storage options:
const upload = multer({ storage: storage })

app.get('/',(req,res)=>{
    res.status(200).json({msg:'this is message'})
})
app.post('/item/post',upload.array("files"),createItem)
app.use('/auth',authRouter)
app.use('/item',itemRouter)

const POST = process.env.PORT || 5000
app.listen(POST,()=>console.log(`server run in ${POST}`))




