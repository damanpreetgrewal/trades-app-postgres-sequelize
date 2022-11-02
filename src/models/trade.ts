import { DataTypes, Model } from 'sequelize';

import sequelize from '../utils/database';

class Trade extends Model {
  id!: number;
  ticker!: string;
  amount!: number;
  price!: number;
  executionType!: string;
  userId!: number;
}

Trade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    executionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    executionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Trade',
    tableName: 'trades',
  }
);

export default Trade;
