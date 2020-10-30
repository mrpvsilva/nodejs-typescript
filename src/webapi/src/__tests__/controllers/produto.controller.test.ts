import { Estoque } from '@models/Estoque'
/* eslint-disable no-unused-vars */
import { Application } from 'express'
import request from 'supertest'
import faker from 'faker'

import { AppTest } from '../util/app'
import { getRepository, Repository } from 'typeorm'
import { Produto } from '@models/Produto'

const uri = '/api/v1/produtos'
let app: Application
let appTest: AppTest
let repository: Repository<Produto>

jest.setTimeout(30000)

beforeAll(async () => {
  appTest = new AppTest()
  app = await appTest.getApp()
  repository = getRepository(Produto)
})

afterAll(async () => {
  await appTest.connection.close()
})

describe('ProdutoController - POST', () => {
  it('deve criar um novo produto', async (done) => {
    const body = {
      nome: faker.commerce.productName(),
    }

    const response = await request(app).post(uri).send(body)

    expect(response.status).toBe(201)
    expect(response.body).toBeTruthy()
    const produto = await repository.findOne(response.body.id)
    expect(produto).toBeTruthy()
    expect(produto.nome).toBe(body.nome)

    done()
  })

  it('deve dar erro quando o nome não existir', async (done) => {
    const response = await request(app).post(uri).send()
    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ nome: 'Nome é obrigatório' }],
    })

    done()
  })

  it('deve dar erro quando o nome for vazio', async (done) => {
    const response = await request(app).post(uri).send({ nome: '' })
    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ nome: 'Nome é obrigatório' }],
    })

    done()
  })

  it('deve dar erro quando o nome já existir', async (done) => {
    await repository.save({ nome: 'abcde' })
    const response = await request(app).post(uri).send({ nome: 'abcde' })
    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ nome: 'Produto já existe' }],
    })

    done()
  })
})

describe('ProdutoController - GET', () => {
  beforeAll(async () => {
    await repository.clear()
    await repository.save([
      {
        nome: 'p1',
      },
      {
        nome: 'p2',
      },
      {
        nome: 'p3',
      },
      {
        nome: 'p4',
      },
    ])
  })

  afterAll(() => repository.clear())

  it('deve recuperar todos os produto', async (done) => {
    const response = await request(app).get(uri)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toEqual(4)
    done()
  })
  it('deve recuperar o produto de nome p1', async (done) => {
    const response = await request(app).get(`${uri}?nome=p1`)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toEqual(1)
    expect(response.body[0].nome).toBe('p1')
    done()
  })

  it('deve recuperar o produto pelo id', async (done) => {
    const estoque = new Estoque()
    estoque.valorPago = 5.0
    estoque.margem = 0.1
    estoque.quantidade = 500
    estoque.quantidadeMinima = 15
    estoque.notaFiscal = '1234566'

    const produto = await repository.save({
      nome: 'p5',
      estoque: estoque,
    })

    const response = await request(app).get(`${uri}/${produto.id}`)

    expect(response.status).toBe(200)
    expect(response.body).toBeTruthy()
    expect(response.body.id).toBe(produto.id)
    expect(response.body.estoque).toBeTruthy()
    expect(response.body.estoque.valorVenda).toBe(5.5)
    done()
  })
})

describe('ProdutoController - PUT', () => {
  it('deve alterar um produto', async (done) => {
    const produto = await repository.save({ nome: 'p6' })

    const response = await request(app)
      .put(`${uri}/${produto.id}`)
      .send({ nome: 'p6_' })

    expect(response.status).toBe(200)
    expect(response.body).toBeFalsy()

    const new_ = await repository.findOne(produto.id)
    expect(new_.nome).toBe('p6_')
    done()
  })
})
