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
      password: '$2y$10$k9Rjj1VHyE7zUHZ9ktpAdOUUPsrxPu2Mz5A9I9wDAqGJDveaTTS76',
    });
  }
}
