import fs from 'fs';
import path from 'path';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const fileTemplate = (seedName: string) =>
  `import { Factory, Seeder } from 'typeorm-seeding';

export default class ${capitalize(seedName)} implements Seeder {
  public async run(factory: Factory): Promise<any> {
    // await factory(Entity)().create();
  }
}
`;

function generateSeed(seedName: string) {
  const time = Date.now();

  const fileName = `${time}-${capitalize(seedName)}`;

  const seedPath = path.resolve(__dirname, '..', 'database', 'seeds');

  if (!fs.existsSync(seedPath)) {
    fs.mkdirSync(seedPath);
  }

  fs.writeFileSync(path.resolve(seedPath, `${fileName}.seed.ts`), fileTemplate(seedName));
}

if (!process.argv[2]) {
  throw new Error('The seed name must be typed');
} else {
  generateSeed(process.argv[2]);
}
