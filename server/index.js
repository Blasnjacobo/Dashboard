/* eslint-disable no-unused-vars */
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'

/* CONFIGURATION */

// ? (1)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ? (2)
dotenv.config()

const app = express()
// ? (3)
app.use(express.json())
// ? (4)
app.use(helmet())
// ? (5)
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
// ? (6)
app.use(morgan('common'))
// ? (7)
app.use(bodyParser.json({ limit: '30mb', extended: true }))
// ? (8)
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// ? (9)
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

/* FILE STORAGE */
// ? (10)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
// ? (11)
const upload = multer({ storage })

/* MONGOOSE SETUP */
// ? (12)
const PORT = process.env.PORT || 6001
mongoose
  .connect(process.env.MONGO_URL, {
    //! useNewUrlParser: true, Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
    //! useUnifiedTopology: true, Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
  })
  .catch((error) => console.log(`${error} did ot connect`))
