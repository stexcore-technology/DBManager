import { Controller, type IRequestHandler } from '@stexcore/api-engine';
import ConnectionsService from '../../../services/connections.service';

/**
 * Handle connections
 */
export default class ConnectionsController extends Controller {
  /**
   * Connections service
   */
  private connections: ConnectionsService = this.$(ConnectionsService);

  /**
   * Handle request to get all connections
   * @param req Request incomming
   * @param res Response utils
   * @param next Next middleware
   */
  public GET: IRequestHandler = async (_req, res, next) => {
    try {
      // Get connections
      const connections = await this.connections.getAllConnections();

      // Response connections
      res.json({
        success: true,
        message: 'Connections recovered!',
        data: connections,
      });
    } catch (err) {
      // Forward error
      next(err);
    }
  };

  public POST: IRequestHandler = async (req, res, next) => {
    try {
      // Create connection
      const connection = await this.connections.createConnection(req.body);

      // Response connection
      res.json({
        success: true,
        message: 'Connection created!',
        data: connection,
      });
    } catch (err) {
      next(err);
    }
  };
}
