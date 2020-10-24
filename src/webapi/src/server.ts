import 'reflect-metadata'
import { createConnection } from 'typeorm'
import bodyParser from 'body-parser'

import { App } from './app'

import { ProdutoController } from '@controllers/ProdutoController'

createConnection()
  .then(() => {
    const app = new App({
      port: 5000,
      controllers: [
        new ProdutoController()
      ],
      middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true })
      ]
    })

    app.listen()
  })
  .catch(err => console.error(err))
