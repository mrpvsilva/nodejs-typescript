import request from 'supertest'
import faker from 'faker'

import { AppTest } from '../util/app'
const uri = '/api/v1/produtos'
let app: any

jest.setTimeout(30000)
beforeAll(async () => {
  app = await new AppTest().getApp()
})

it('deve criar um novo produto', async (done) => {
  const body = { nome: faker.commerce.productName() }
  const response = await request(app).post(uri).send(body)
  expect(response.status).toBe(201)
  done()
})
