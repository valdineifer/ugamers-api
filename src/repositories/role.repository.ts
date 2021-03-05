import { EntityRepository, Repository } from 'typeorm';
import Role from 'src/entities/Role';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

}
