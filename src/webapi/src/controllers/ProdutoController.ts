/* eslint-disable no-unused-vars */
import express, { Request, Response, NextFunction } from 'express'
import { Repository, getRepository } from 'typeorm'

import { IControllerBase } from '../interfaces/IControllerBase'
import { Produto } from '@models/Produto'

export class ProdutoController implements IControllerBase {
  public path: string = 'produtos'
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
      const produtos = await this.repository.find()
      res.json(produtos)
    } catch (err) {
      next(err)
    }
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const produto = await this.repository.findOne(id)
      res.json(produto)
    } catch (err) {
      next(err)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const produto = await this.repository.save(req.body)
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
      res.json()
    } catch (err) {
      next(err)
    }
  }
}
