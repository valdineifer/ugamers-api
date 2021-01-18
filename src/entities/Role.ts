import { Field, ObjectType } from "@nestjs/graphql";
import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import User from "./User";

@ObjectType()
@Entity({name: 'role'})
export default class Role extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false, type: 'varchar', length: 255 })
  description: string;


  // Associations

  @OneToMany(() => User, user => user.role)
  userConnection: Promise<User[]>;
}
