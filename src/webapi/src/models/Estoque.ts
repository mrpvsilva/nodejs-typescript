import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Estoque {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  valorPago: number

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: false,
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

  protected valorVenda: number

  @AfterLoad()
  setValorVenda() {
    this.valorVenda = (1 + this.margem) * this.valorPago
  }
}
