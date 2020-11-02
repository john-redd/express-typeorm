import 'reflect-metadata'
import dotenv from 'dotenv'
import express from 'express'
import { __prod__ } from './constants'
import connectDb from './config/connectDb'
import { router as apiRouter } from './routers/api'

dotenv.config()
const { SERVER_PORT } = process.env

const app = express()

const main = async () => {
  connectDb(app)

  app.use(express.json())

  app.use('/api', apiRouter)

  app.listen(SERVER_PORT, () =>
    console.log(`Server running on port ${SERVER_PORT}`)
  )
}

main()
