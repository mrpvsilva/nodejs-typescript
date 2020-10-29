import { Estoque } from '@models/Estoque'
/* eslint-disable no-unused-vars */
import { Application } from 'express'
import faker from 'faker'
import request from 'supertest'
import { getRepository, Repository } from 'typeorm'

import { AppTest } from '../util/app'
import { Produto } from '@models/Produto'

const uri = '/api/v1/produtos'
let app: Application
let appTest: AppTest
let repositoryProduto: Repository<Produto>
let repositoryEstoque: Repository<Estoque>

beforeAll(async () => {
  appTest = new AppTest()
  app = await appTest.getApp()
  repositoryProduto = getRepository(Produto)
  repositoryEstoque = getRepository(Estoque)
})

afterAll(async () => {
  await appTest.connection.close()
})

describe('EstoqueController - POST', () => {
  it('deve criar um novo estoque', async (done) => {
    const estoqueAntigo = new Estoque()
    estoqueAntigo.valorPago = 1
    estoqueAntigo.margem = 1
    estoqueAntigo.quantidade = 10
    estoqueAntigo.quantidadeMinima = 1
    estoqueAntigo.notaFiscal = '1'

    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
      estoque: estoqueAntigo,
    })

    const body = {
      valorPago: 5.0,
      margem: 10,
      quantidade: 500,
      quantidadeMinima: 15,
      notaFiscal: '1234566',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(201)
    expect(response.body).toBeTruthy()
    expect(response.body.id).toBeTruthy()

    const [estoque] = await repositoryEstoque.find({
      where: { id: response.body.id },
    })
    console.log('ESTOQUE', estoque)
    expect(estoque).toBeTruthy()
    expect(estoque.valorPago).toBe(body.valorPago)
    expect(estoque.margem).toBe(body.margem)
    expect(estoque.quantidade).toBe(estoqueAntigo.quantidade + body.quantidade)
    expect(estoque.quantidadeMinima).toBe(body.quantidadeMinima)
    expect(estoque.notaFiscal).toBe(body.notaFiscal)
    expect(estoque.produtoId).toBe(produto.id)

    done()
  })
})
