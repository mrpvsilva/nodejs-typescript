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
      margem: 0.1,
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

    expect(estoque).toBeTruthy()
    expect(estoque.valorPago).toBe(body.valorPago)
    expect(estoque.margem).toBe(body.margem)
    expect(estoque.quantidade).toBe(estoqueAntigo.quantidade + body.quantidade)
    expect(estoque.quantidadeMinima).toBe(body.quantidadeMinima)
    expect(estoque.notaFiscal).toBe(body.notaFiscal)
    expect(estoque.produtoId).toBe(produto.id)

    done()
  })

  it('deve dar erro ao criar um estoque sem o campo valorPago', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      margem: 0.1,
      quantidade: 500,
      quantidadeMinima: 15,
      notaFiscal: '1234566',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ valorPago: 'Valor pago é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque com o campo valorPago vazio', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      valorPago: '',
      margem: 0.1,
      quantidade: 500,
      quantidadeMinima: 15,
      notaFiscal: '1234566',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ valorPago: 'Valor pago é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque com o campo valorPago menor ou igual a zero', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      valorPago: 0,
      margem: 0.1,
      quantidade: 500,
      quantidadeMinima: 15,
      notaFiscal: '1234566',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ valorPago: 'Valor pago é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque sem o campo margem', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      valorPago: 0.44,
      quantidade: 500,
      quantidadeMinima: 15,
      notaFiscal: '1234566',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ margem: 'Margem é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque com o campo margem vazio', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      margem: '',
      valorPago: 0.44,
      quantidade: 500,
      quantidadeMinima: 15,
      notaFiscal: '1234566',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ margem: 'Margem é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque com o campo margem menor ou igual a zero', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      valorPago: 0.44,
      margem: 0,
      quantidade: 500,
      quantidadeMinima: 15,
      notaFiscal: '1234566',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ margem: 'Margem é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque sem o campo quantidade', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      valorPago: 0.44,
      margem: 1,
      quantidadeMinima: 15,
      notaFiscal: '1234566',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ quantidade: 'Quantidade é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque com o campo quantidade vazio', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      valorPago: 0.44,
      margem: 1,
      quantidade: '',
      quantidadeMinima: 15,
      notaFiscal: '1234566',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ quantidade: 'Quantidade é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque com o campo quantidade menor ou igual a zero', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      valorPago: 0.44,
      margem: 1,
      quantidade: 0,
      quantidadeMinima: 15,
      notaFiscal: '1234566',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ quantidade: 'Quantidade é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque sem o campo quantidadeMinima', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      valorPago: 0.44,
      margem: 1,
      quantidade: 15,
      notaFiscal: '1234566',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ quantidadeMinima: 'Quantidade mínima é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque com o campo quantidadeMinima vazio', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      valorPago: 0.44,
      margem: 1,
      quantidade: 50,
      quantidadeMinima: '',
      notaFiscal: '1234566',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ quantidadeMinima: 'Quantidade mínima é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque com o campo quantidadeMinima menor ou igual a zero', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      valorPago: 0.44,
      margem: 1,
      quantidade: 50,
      quantidadeMinima: 0,
      notaFiscal: '1234566',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ quantidadeMinima: 'Quantidade mínima é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque sem o campo notaFiscal', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      valorPago: 0.44,
      margem: 1,
      quantidade: 15,
      quantidadeMinima: 10,
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ notaFiscal: 'Nota fiscal é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque com o campo notaFiscal vazio', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    const body = {
      valorPago: 0.44,
      margem: 1,
      quantidade: 50,
      quantidadeMinima: 12,
      notaFiscal: '',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [{ notaFiscal: 'Nota fiscal é obrigatório' }],
    })

    done()
  })

  it('deve dar erro ao criar um estoque com a nota fiscal duplicada para o mesmo produto', async (done) => {
    const produto = await repositoryProduto.save({
      nome: faker.commerce.productName(),
      estoque: {
        valorPago: 0.44,
        margem: 1,
        quantidade: 50,
        quantidadeMinima: 15,
        notaFiscal: '453267891',
      },
    })

    await repositoryEstoque.update(produto.estoque.id, {
      produtoId: produto.id,
    })

    const body = {
      valorPago: 0.7,
      margem: 0.5,
      quantidade: 50,
      quantidadeMinima: 10,
      notaFiscal: '453267891',
    }

    const response = await request(app)
      .post(`${uri}/${produto.id}/estoques`)
      .send(body)

    expect(response.status).toBe(400)
    expect(response.body).toBeTruthy()
    expect(response.body).toEqual({
      errors: [
        {
          notaFiscal: `Já existe um estoque do produto ${produto.nome} com a nota fiscal ${body.notaFiscal}`,
        },
      ],
    })

    done()
  })

  it('deve criar um estoque com a mesma nota fiscal para produtos diferentes', async (done) => {
    const p1 = await repositoryProduto.save({
      nome: faker.commerce.productName(),
      estoque: {
        valorPago: 0.44,
        margem: 1,
        quantidade: 50,
        quantidadeMinima: 15,
        notaFiscal: '453267891',
      },
    })

    const p2 = await repositoryProduto.save({
      nome: faker.commerce.productName(),
    })

    await repositoryEstoque.update(p1.estoque.id, {
      produtoId: p1.id,
    })

    const body = {
      valorPago: 0.7,
      margem: 0.5,
      quantidade: 50,
      quantidadeMinima: 10,
      notaFiscal: '453267891',
    }

    const response = await request(app)
      .post(`${uri}/${p2.id}/estoques`)
      .send(body)

    expect(response.status).toBe(201)
    expect(response.body).toBeTruthy()
    expect(response.body.notaFiscal).toBe('453267891')

    done()
  })
})
