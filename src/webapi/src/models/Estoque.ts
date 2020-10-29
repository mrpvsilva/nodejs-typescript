import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Estoque {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'decimal',
    nullable: false,
  })
  valorPago: number

  @Column({
    type: 'decimal',
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
    nullable: false,
  })
  produtoId: string
}
