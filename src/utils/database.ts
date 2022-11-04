import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', '123', {
  host: 'db-postgres',
  dialect: 'postgres',
  port: 5432,
});

export default sequelize;
