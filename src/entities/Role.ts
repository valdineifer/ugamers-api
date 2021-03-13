import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

export interface RoleInterface {
  id: number;
  description: string;
}

@ObjectType()
@Entity({ name: 'role' })
export default class Role extends BaseEntity implements RoleInterface {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  description: string;

  // Associations

  @OneToMany(() => User, (user) => user.roleConnection)
  userConnection: Promise<User[]>;
}
