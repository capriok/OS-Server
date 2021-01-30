import * as express from "express"
import * as cors from 'cors'
import { corsOptions, corsMiddleware } from './cors'

import router from './routes/routes'
import mySQL from './Database/MySQL'

mySQL.connect(() => console.log('MySQL connected successfully'))

const app = express()

const port = process.env.PORT || 9000
const origins = ['http://localhost:3000', 'https://oversites.netlify.app', 'https://oversites.kylecaprio.dev']

app.use(express.json())

app.use(cors(corsOptions(origins)), corsMiddleware)

app.use('/', router)

app.listen(port, () => console.log(`Server running on port ${port}`))

module.exports = app