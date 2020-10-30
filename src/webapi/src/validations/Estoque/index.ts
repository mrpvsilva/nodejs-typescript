import { Estoque } from '@models/Estoque'
import { Produto } from '@models/Produto'
import validate from '@validations/validate'
// eslint-disable-next-line no-unused-vars
import { checkSchema, Schema } from 'express-validator'
import { getRepository } from 'typeorm'

const schema: Schema = {
  valorPago: {
    in: 'body',
    isFloat: {
      options: {
        gt: 0,
      },
      errorMessage: 'Valor pago é obrigatório',
    },
  },
  margem: {
    in: 'body',
    isFloat: {
      options: {
        gt: 0,
      },
      errorMessage: 'Margem é obrigatório',
    },
  },
  quantidade: {
    in: 'body',
    isInt: {
      options: {
        gt: 0,
      },
      errorMessage: 'Quantidade é obrigatório',
    },
  },
  quantidadeMinima: {
    in: 'body',
    isInt: {
      options: {
        gt: 0,
      },
      errorMessage: 'Quantidade mínima é obrigatório',
    },
  },
  notaFiscal: {
    in: 'body',
    notEmpty: {
      options: { ignore_whitespace: true },
      errorMessage: 'Nota fiscal é obrigatório',
    },
    custom: {
      options: async (notaFiscal, { req }) => {
        const { produtoId } = req.params
        const count = await getRepository(Estoque).count({
          where: {
            produtoId,
            notaFiscal,
          },
        })

        if (count > 0) {
          const produto = await getRepository(Produto).findOne(produtoId)
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject(
            `Já existe um estoque do produto ${produto.nome} com a nota fiscal ${notaFiscal}`
          )
        }
      },
    },
    // errorMessage: (value, { req }) => {},
  },
}

export const EstoqueValidation = validate(checkSchema(schema))
