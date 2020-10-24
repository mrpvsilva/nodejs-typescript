import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Produto } from '@models/Produto'

const run = async () => {
  await createConnection()
  const produto = new Produto()
  produto.nome = 'Paulo'

  await produto.save()
  console.log('ok')
}

run()
