import 'reflect-metadata'
/* eslint-disable no-unused-vars */
import { Application } from 'express'
import { Connection, createConnection, getConnectionOptions } from 'typeorm'
import bodyParser from 'body-parser'

import { App } from '../../app'
import { ProdutoController } from '@controllers/ProdutoController'
import ErrorHandler from '../../handlers/error.handler'

export class AppTest {
  connection: Connection
  async getApp(): Promise<Application> {
    const options = await getConnectionOptions()
    this.connection = await createConnection(options)
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
