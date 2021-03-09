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
@Entity({ name: 'country' })
export default class Country extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  isoCode: string;

  @Field()
  @Column()
  name: string;

  // Associations

  @OneToMany(
    () => User,
    user => user.countryConnection,
  )
  userConnection: Promise<User[]>;
}
