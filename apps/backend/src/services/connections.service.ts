import { DBConnection } from '../classes/DBConnection';
import ConnectionModel, { IConnection } from '../models/connection.model';
import { Service } from '@stexcore/api-engine';

/**
 * Connections server service
 */
export default class ConnectionsService extends Service {
  /**
   * Connection Model Instance
   */
  private Connection = this.model$(ConnectionModel);

  private connections: DBConnection[] = [];

  onInit() {
    setTimeout(async () => {
      const connectionsData = await this.Connection.findAll();

      this.connections = connectionsData.map(
        (connectionData) => new DBConnection(connectionData.toJSON()),
      );
    }, 1000);
  }

  /**
   * Get all connections
   * @returns All connections
   */
  public getAllConnections() {
    return this.Connection.findAll();
  }

  /**
   * Get connection by ID
   * @param id Identifier connection
   * @returns All connections
   */
  public getConnection(id: number) {
    return this.Connection.findOne({ where: { id } });
  }

  /**
   * Create a new connection
   * @param data Data connection
   * @returns connection created
   */
  public async createConnection(data: Omit<IConnection, 'id'>) {
    // Create a new connection
    const connectionData = await this.Connection.create(data);
    const connection = new DBConnection(connectionData.toJSON());

    this.connections.push(connection);

    return connectionData;
  }

  public async updateConnection(id: number, data: Partial<IConnection>) {
    const [nAffecteds] = await this.Connection.update(data, { where: { id } });

    const connection = this.connections.find(
      (connection) => connection.id === id,
    );

    if (connection) {
      connection.updateConfig(data);
    }

    return nAffecteds;
  }

  public async deleteConnection(id: number) {
    const nAffecteds = await this.Connection.destroy({ where: { id } });

    const index = this.connections.findIndex(
      (connection) => connection.id === id,
    );

    if (index !== -1) {
      this.connections.splice(index, 1);
    }

    return nAffecteds;
  }
}
