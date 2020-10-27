import express, { Application, RequestHandler } from 'express'

export class App {
  public app: Application
  public port: number

  constructor(appInit: {
    port: number
    middleWares: any
    controllers: any
    handlers: any
  }) {
    this.app = express()
    this.port = appInit.port
    this.middlewares(appInit.middleWares)
    this.routes(appInit.controllers)
    this.handlers(appInit.handlers)
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void
  }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare)
    })
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void
  }) {
    controllers.forEach((controller) => {
      this.app.use(`/api/v1/${controller.path}`, controller.router)
    })
  }

  private handlers(handlers: {
    forEach: (arg0: (handler: any) => void) => void
  }) {
    handlers.forEach((handler) => {
      this.app.use(handler)
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`)
    })
  }

  public addMiddlewares(...middlewares) {
    this.app.use(middlewares)
  }
}
