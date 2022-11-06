import { DataTypes, Model } from 'sequelize';

import sequelize from '../utils/database';

class Trade extends Model {
  id!: number;
  ticker!: string;
  amount!: number;
  price!: number;
  executionType!: string;
  executionDate!: Date;
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
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    executionType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'execution_type',
    },
    executionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'execution_date',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
  },
  {
    sequelize,
    modelName: 'Trade',
    tableName: 'trades',
  }
);

export default Trade;
