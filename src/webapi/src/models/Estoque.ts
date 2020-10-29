import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export class ColumnNumericTransformer {
  to(data: number): number {
    return data
  }

  from(data: string): number {
    return parseFloat(data)
  }
}

@Entity()
export class Estoque {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  valorPago: number

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  margem: number

  @Column({
    type: 'int',
    nullable: false,
  })
  quantidade: number

  @Column({
    type: 'int',
    nullable: false,
  })
  quantidadeMinima: number

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  notaFiscal: string

  @Column({
    type: 'uuid',
    length: 36,
    nullable: true,
  })
  produtoId: string

  valorVenda: number

  @AfterLoad()
  setValorVenda() {
    this.valorVenda = this.valorPago * (1 + this.margem)
  }
}
