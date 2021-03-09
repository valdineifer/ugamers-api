import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';

@ObjectType()
@Entity({ name: 'role' })
export default class Role extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  description: string;

  // Associations

  @OneToMany(
    () => User,
    user => user.roleConnection,
  )
  userConnection: Promise<User[]>;
}
