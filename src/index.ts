import * as express from "express"
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'
import { Router } from 'express'
import { corsOptions, corsMiddleware } from './cors'

import routes from './Routes/index'
import mySQL from './Database/MySQL'

mySQL.connect(() => console.log('MySQL connected successfully'))

const app = express()
const router = Router()

const port = process.env.PORT || 9000
const origins = ['http://localhost:3000', 'https://oversites.netlify.app', 'https://oversites.kylecaprio.dev']

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions(origins)), corsMiddleware)

app.use('/', routes(router))

app.listen(port, () => console.log(`Server running on port ${port}`))

module.exports = app