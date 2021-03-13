# uGamers

## Installation

```bash
# do not run with npm
$ yarn install
```

## NPM Scripts
The project have those following scripts (consider `npm run [command]` or `yarn [command]`):

| Command   | Description                                                  |
|-----------|--------------------------------------------------------------|
| prebuild  | Delete `/dist` folder for clean build                        |
| build     | Build project                                                |
| start     | Start project, same as `nest start`                          |
| start:dev | Start project and watch for changes, same as `nest start -w` |
| lint      | Run ESLint                                                   |
| lint:fix  | Run ESLint and try to fix automatically                      |

### Database commands
| Command                       | Description                            |
|-------------------------------|----------------------------------------|
| typeorm                       | Shorter command for TypeORM            |
| db:fresh                      | Drop schema and run all migrations     |
| db:fresh:seed                 | Do the command above and run all seeds |
| db:seed:generate [SeederName] | Generate a seed                        |
| db:seed:run                   | Run all seeds                          |

---

by Daniele Valverde and Valdinei Ferreira
