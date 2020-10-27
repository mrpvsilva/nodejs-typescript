/* eslint-disable no-unused-vars */
import { Application } from 'express'
import request from 'supertest'
import faker from 'faker'

import { AppTest } from '../util/app'
const uri = '/api/v1/produtos'
let app: Application
let appTest: AppTest

jest.setTimeout(30000)

beforeAll(async () => {
  appTest = new AppTest()
  app = await appTest.getApp()
})

afterAll(async () => {
  await appTest.connection.close()
})

describe('ProdutoController - POST', () => {
  it('deve criar um novo produto', (done) => {
    const body = { nome: faker.commerce.productName() }
    request(app).post(uri).send(body).expect(201).end(done)
  })
  it('deve dar erro', (done) => {
    request(app).post(uri).expect(500).end(done)
  })
})
