import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column()
  password: string;

  @Column('int')
  roleId: number;

  @Column()
  create_at: Date;

  @Column()
  update_at: Date;
}