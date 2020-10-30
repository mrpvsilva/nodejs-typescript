import { Produto } from '@models/Produto'
/* eslint-disable no-unused-vars */
import express, { Request, Response, NextFunction } from 'express'
import { Repository, getRepository } from 'typeorm'

import { IControllerBase } from '../interfaces/IControllerBase'

export class ProdutoController implements IControllerBase {
  public path = 'produtos'
  public router = express.Router()
  repository: Repository<Produto>

  constructor() {
    this.repository = getRepository(Produto)
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/', this.index)
    this.router.get('/:id', this.get)
    this.router.post('/', this.create)
    this.router.put('/:id', this.update)
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nome } = req.query
      const where = nome ? { nome } : {}
      const produtos = await this.repository.find({ where })
      res.json(produtos)
    } catch (err) {
      next(err)
    }
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const produto = await this.repository.findOne(id, {
        relations: ['estoque'],
      })
      res.json(produto)
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req
      const produto = await this.repository.save(body)
      res.status(201).json(produto)
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const { nome } = req.body

      const produto = await this.repository.findOne(id)
      produto.nome = nome

      await this.repository.save(produto)
      res.status(200).json()
    } catch (err) {
      next(err)
    }
  }
}
