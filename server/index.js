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
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import { register } from './controllers/auth.js'
import { createPost } from './controllers/posts.js'
import { verifyToken } from './middleware/auth.js'
import User from './models/User.js'
import Post from './models/Post.js'
import { users, posts } from './data/index.js'

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

/* ROUTES WITH FILES */
// ? (13)
app.post('/auth/register', upload.single('picture'), register)
app.post('/posts', verifyToken, upload.single('picture'), createPost)

/* ROUTES */
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/post', postRoutes)

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

    /* ADDING DATA JUST ONE TIME */
    // User.insertMany(users)
    // Post.insertMany(posts)
  })
  .catch((error) => console.log(`${error} did ot connect`))
