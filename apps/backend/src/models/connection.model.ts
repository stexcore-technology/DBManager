import { DataTypes, type Model } from 'sequelize';
import type { ModelConstructor } from '../types/model-constructor.type';

/**
 * Connection interface
 */
export interface IConnection {
  /**
   * Connection ID
   */
  id: number;
  /**
   * Connection name
   */
  name: string;
  /**
   * Type connection
   */
  type: string;
  /**
   * Port
   */
  port: number;
  /**
   * Hostname
   */
  hostname: string;
  /**
   * user
   */
  user: string;
  /**
   * Password
   */
  password: string;
}

/**
 * Create a model to Connection
 * @param sequelize Sequelize connection
 * @returns Model
 */
const ConnectionModel: ModelConstructor<
  IConnection,
  Omit<IConnection, 'id'>
> = (sequelize) => {
  // Define Structure model
  return sequelize.define<Model<IConnection> & IConnection>(
    'Connection',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.CHAR(15),
        allowNull: false,
      },
      type: {
        type: DataTypes.CHAR(10),
        allowNull: false,
      },
      port: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hostname: {
        type: DataTypes.CHAR(255),
        allowNull: false,
      },
      user: {
        type: DataTypes.CHAR(20),
        allowNull: false,
      },
      password: {
        type: DataTypes.CHAR(255),
        allowNull: false,
      },
    },
    {
      tableName: 'stx_connections',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );
};

export default ConnectionModel;
