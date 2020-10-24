import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Produto extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
      length: 100,
      type: 'varchar',
      unique: true
    })
    nome: string
}
