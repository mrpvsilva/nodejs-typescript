import 'reflect-metadata'
import { Application } from 'express'
import { createConnection, getConnectionOptions } from 'typeorm'
import bodyParser from 'body-parser'

import { App } from '../../app'
import { ProdutoController } from '@controllers/ProdutoController'
import ErrorHandler from '../../middlewares/error.handler'

export class AppTest {
  async getApp(): Promise<Application> {
    const options = await getConnectionOptions()
    await createConnection(options)
    const app = new App({
      port: 5000,
      controllers: [new ProdutoController()],
      middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
      ],
      handlers: [ErrorHandler],
    })
    return app.app
  }
}
