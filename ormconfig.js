// @ts-check
const { resolve } = require('path'); // eslint-disable-line

function getGlob(path) {
  return resolve(__dirname, path);
}

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [getGlob('**/*.entity.js')],
  synchronize: process.env.NODE_ENV !== 'prod',
  migrations: [getGlob('/migrations/**/*.ts')],
  autoLoadEntities: true,
  cli: {
    migrationsDir: '/migrations',
  },
};
