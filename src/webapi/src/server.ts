import 'reflect-metadata'
import { createConnection, getConnectionOptions } from 'typeorm'
import bodyParser from 'body-parser'

import { App } from './app'
import ErrorHandler from './handlers/error.handler'
import { ProdutoController } from '@controllers/ProdutoController'

const run = async () => {
  const options = await getConnectionOptions()
  console.log(options)
  await createConnection(options)
  const app = new App({
    port: 5000,
    controllers: [new ProdutoController()],
    middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
    handlers: [ErrorHandler],
  })
  app.listen()
}
run()
