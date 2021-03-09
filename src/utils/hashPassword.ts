import * as bcrypt from 'bcrypt';

export default async function hashPassword(password: string): Promise<string> {
  const saltRounds = parseInt(process.env.SALT, 10);

  return bcrypt.hash(password, saltRounds);
}
