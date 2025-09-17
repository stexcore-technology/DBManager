import ConnectionModel, { IConnection } from '@/models/connection.model';
import { Service } from '@stexcore/api-engine';

/**
 * Connections server service
 */
export default class ConnectionsService extends Service {
  /**
   * Connection Model Instance
   */
  private Connection = this.model$(ConnectionModel);

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
  public createConnection(data: Omit<IConnection, 'id'>) {
    return this.Connection.create(data);
  }

  public updateConnection(id: number, data: Partial<IConnection>) {
    return this.Connection.update(data, { where: { id } });
  }

  public deleteConnection(id: number) {
    return this.Connection.destroy({ where: { id } });
  }
}
