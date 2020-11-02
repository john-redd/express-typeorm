import dotenv from 'dotenv'
import { Express } from 'express'
import { ConnectionOptions, createConnection } from 'typeorm'
import { __prod__ } from '../constants'

dotenv.config()

const {
  TYPEORM_HOST,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_PORT
} = process.env

const connectDb = async (app: Express): Promise<void> => {
  try {
    const _connectionOptions: ConnectionOptions = {
      type: 'postgres',
      synchronize: true,
      entities: ['dist/entities/**/*.js'],
      migrations: ['dist/migrations/**/*.js'],
      subscribers: ['dist/subscribers/**/*.js'],
      host: TYPEORM_HOST!,
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      port: +TYPEORM_PORT!,
      logging: !__prod__
    }

    const typeorm = await createConnection(_connectionOptions)

    app.set('db', typeorm)
  } catch (err) {
    console.log('DB Connection Error: ', err)
  }
}

export default connectDb
