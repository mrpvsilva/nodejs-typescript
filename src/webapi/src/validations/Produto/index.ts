// eslint-disable-next-line no-unused-vars
import { Schema, checkSchema } from 'express-validator'
import { getRepository, Not } from 'typeorm'
import { Produto } from '@models/Produto'
import validate from '../validate'

const schema: Schema = {
  nome: {
    in: 'body',
    notEmpty: {
      options: { ignore_whitespace: true },
      errorMessage: 'Nome é obrigatório',
    },
    custom: {
      options: async (value, { req }) => {
        const { id } = req.params
        const count = await getRepository(Produto).count({
          where: {
            id: Not(id || 0),
            nome: value,
          },
        })
        // eslint-disable-next-line prefer-promise-reject-errors
        if (count > 0) return Promise.reject()
      },
      errorMessage: 'Produto já existe',
    },
  },
}

export const ProdutoValidation = validate(checkSchema(schema))
