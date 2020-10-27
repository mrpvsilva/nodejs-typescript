import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    length: 100,
    type: 'varchar',
    unique: true,
  })
  nome: string
}
