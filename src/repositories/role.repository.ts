import { EntityRepository, Repository } from 'typeorm';
import Role from 'src/entities/Role';

@EntityRepository(Role)
export default class RoleRepository extends Repository<Role> {}
