import 'reflect-metadata'
import { createConnection } from 'typeorm'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import { App } from './app'
import ErrorHandler from './handlers/error.handler'
import { ProdutoController } from '@controllers/ProdutoController'

dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '',
})

const run = async () => {
  await createConnection()
  const app = new App({
    port: 5000,
    controllers: [new ProdutoController()],
    middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
    handlers: [ErrorHandler],
  })
  app.listen()
}
run()
