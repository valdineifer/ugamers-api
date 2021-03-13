import { Factory, Seeder } from 'typeorm-seeding';
import UserRole from '../../helpers/enum/user-roles.enum';
import User from '../../entities/User';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().create({
      name: 'Valdinei Ferreira',
      username: 'valdinei',
      email: 'valdineifer@outlook.com',
      roleId: UserRole.ADMIN,
      status: true,
      password: '$2b$10$/gallDBhtKruCPL46iuLD.q5X1xXJBJpB8L2aH5gx.2jbB5Ff2DwW',
    });
  }
}
