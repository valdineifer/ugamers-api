import { define } from 'typeorm-seeding';
import Faker from 'faker';
import User from '../../entities/User';
import UserRole from '../../helpers/enum/user-roles.enum';
import Role from '../../entities/Role';

Faker.locale = 'pt_BR';

define(User, (faker: typeof Faker) => {
  const user = new User();

  const gender = faker.random.number(1);
  const fullName = `${faker.name.firstName(gender)} ${faker.name.lastName(gender)}`;

  user.name = fullName;
  user.email = faker.internet.email();
  user.username = faker.internet.userName();
  user.password = faker.internet.password(11);
  user.roleId = UserRole.USER;

  return user;
});

define(Role, (faker: typeof Faker) => {
  const role = new Role();

  role.id = faker.random.number(3);
  role.description = faker.name.jobArea();

  return role;
});
