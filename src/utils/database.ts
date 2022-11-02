import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', '123', {
  host: 'db-postgres',
  dialect: 'postgres',
  port: 5432,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

export default sequelize;
