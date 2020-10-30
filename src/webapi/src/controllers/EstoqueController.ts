/* eslint-disable no-unused-vars */
import { getRepository, Repository } from 'typeorm'
import { Estoque } from '@models/Estoque'
import express, { NextFunction, Request, Response } from 'express'

import { IControllerBase } from './../interfaces/IControllerBase'
import { Produto } from '@models/Produto'
import { EstoqueValidation } from '@validations/Estoque'

export class EstoqueController implements IControllerBase {
  public path = 'produtos'
  public router = express.Router()
  repository: Repository<Estoque>
  repositoryProduto: Repository<Produto>

  constructor() {
    this.repository = getRepository(Estoque)
    this.repositoryProduto = getRepository(Produto)
    this.initRoutes()
  }

  initRoutes() {
    this.router.post('/:produtoId/estoques', EstoqueValidation, this.create)
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { produtoId } = req.params
      const { body } = req

      const produto = await this.repositoryProduto.findOne(produtoId, {
        relations: ['estoque'],
      })

      body.quantidade =
        body.quantidade + (produto.estoque ? produto.estoque.quantidade : 0)
      body.produtoId = produtoId
      produto.estoque = body
      await this.repositoryProduto.save(produto)
      res.status(201).json(body)
    } catch (err) {
      next(err)
    }
  }
}
