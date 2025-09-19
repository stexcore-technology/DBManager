import { Controller, type IRequestHandler } from '@stexcore/api-engine';
import ConnectionsService from '../../../../services/connections.service';
import { notFound } from '@stexcore/http-status';

/**
 * Handle connection
 */
export default class ConnectionController extends Controller {
  /**
   * Connections service
   */
  private connections: ConnectionsService = this.$(ConnectionsService);

  /**
   * Handle request info API
   * @param req Request incomming
   * @param res Response utils
   * @param next Next middleware
   */
  public GET: IRequestHandler = async (req, res, next) => {
    try {
      // Get connection
      const id = parseInt(req.params['id']);
      const connection = await this.connections.getConnection(id);

      if (!connection)
        throw notFound("Connection '" + req.params['id'] + "' not found!");

      // Response connections
      res.json({
        success: true,
        message: 'Connection found!',
        data: connection,
      });
    } catch (err) {
      // Forward error
      next(err);
    }
  };

  public PATCH: IRequestHandler = async (req, res, next) => {
    try {
      // Create connection
      const id = parseInt(req.params['id']);
      const nAffecteds = await this.connections.updateConnection(id, req.body);

      if (!nAffecteds)
        throw notFound("Connection '" + req.params['id'] + "' not found!");

      // Get connection
      const connection = await this.connections.getConnection(id);

      if (!connection)
        throw notFound("Connection '" + req.params['id'] + "' not found!");

      // Response connection
      res.json({
        success: true,
        message: 'Connection updated!',
        data: connection,
      });
    } catch (err) {
      next(err);
    }
  };

  public DELETE: IRequestHandler = async (req, res, next) => {
    try {
      // Create connection
      const id = parseInt(req.params['id']);
      const nAffecteds = await this.connections.deleteConnection(id);

      if (!nAffecteds)
        throw notFound("Connection '" + req.params['id'] + "' not found!");

      // Response connection
      res.json({
        success: true,
        message: 'Connection deleted!',
        data: null,
      });
    } catch (err) {
      next(err);
    }
  };
}
