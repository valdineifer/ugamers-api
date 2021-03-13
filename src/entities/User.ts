import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ObjectType, Field } from '@nestjs/graphql';
import Role from './Role';

@ObjectType()
@Entity({ name: 'user' })
@Unique(['email'])
export default class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  status: boolean;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  confirmationToken: string;

  @Field()
  @Column()
  recoverToken: string;

  @Field()
  @Column()
  roleId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @DeleteDateColumn()
  deletedAt: Date;

  @Field(() => Role)
  role: Role;

  // Associations

  @ManyToOne(() => Role, (role) => role.userConnection)
  @JoinColumn({ name: 'roleId' })
  roleConnection: Promise<Role>;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, 10);
    return hash === this.password;
  }
}
