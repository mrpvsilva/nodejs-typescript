/* eslint-disable no-unused-vars */
import { getRepository, Repository } from 'typeorm'
import { Estoque } from '@models/Estoque'
import express, { NextFunction, Request, Response } from 'express'

import { IControllerBase } from './../interfaces/IControllerBase'

export class EstoqueController implements IControllerBase {
  public path = 'estoques'
  public router = express.Router()
  repository: Repository<Estoque>

  constructor() {
    this.repository = getRepository(Estoque)
    this.initRoutes()
  }

  initRoutes() {
    this.router.post('/', this.create)
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req
      const estoque = await this.repository.save(body)
      res.status(201).json(estoque)
    } catch (err) {
      next(err)
    }
  }
}
