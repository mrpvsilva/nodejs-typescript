import request from 'supertest'
import faker from 'faker'

import { AppTest } from '../util/app'
const uri = '/api/v1/produtos'
let app: any

jest.setTimeout(30000)
beforeAll(async () => {
  app = await new AppTest().getApp()
})

describe('ProdutoController - POST', () => {
  it('deve criar um novo produto', () => {
    const body = { nome: faker.commerce.productName() }
    return request(app).post(uri).send(body).expect(201)
  })
  it('deve dar erro', () => {
    return request(app).post(uri).expect(500)
  })
})
