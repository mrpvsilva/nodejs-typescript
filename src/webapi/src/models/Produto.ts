import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { Estoque } from './Estoque'

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

  @OneToOne(() => Estoque, {
    cascade: true,
  })
  @JoinColumn()
  estoque: Estoque
}
