import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'user' })
@Unique(['email'])
export default class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Field()
  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Field()
  @Column({ nullable: false, type: 'varchar', length: 100 })
  username: string;

  @Field()
  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: string;

  @Field()
  @Column({ nullable: false, default: true })
  status: boolean;

  @Field()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
