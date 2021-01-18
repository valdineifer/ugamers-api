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
  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Field()
  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Field()
  @Column({ nullable: false, type: 'varchar', length: 100 })
  username: string;

  @Field()
  @Column({ nullable: false, default: true })
  status: boolean;

  @Field()
  @Column({ nullable: false })
  password: string;

  @Field()
  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;

  @Field()
  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;

  @Field({defaultValue: 1, nullable: false})
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

  @ManyToOne(() => Role, role => role.userConnection)
  @JoinColumn({name: 'role_id'})
  roleConnection: Promise<Role>;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, 10);
    return hash === this.password;
  }
}
