import { Factory, Seeder } from 'typeorm-seeding';
import UserRole from '../../helpers/enum/user-roles.enum';
import Role, { RoleInterface } from '../../entities/Role';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const roles: RoleInterface[] = [
      { id: UserRole.USER, description: UserRole[UserRole.USER] },
      { id: UserRole.MODERATOR, description: UserRole[UserRole.MODERATOR] },
      { id: UserRole.ADMIN, description: UserRole[UserRole.ADMIN] },
    ];

    await Promise.all(
      roles.map(async (role) => {
        const newRole = await factory(Role)().create(role);
        return newRole;
      }),
    );
  }
}
