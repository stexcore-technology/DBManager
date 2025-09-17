import type { Model, ModelStatic, Sequelize } from 'sequelize';

/**
 * Model constructor interface
 */
export type ModelConstructor<
  /**
   * Model attributes
   */
  TModelAttributes extends object = object,
  /**
   * Model attributes to create instance
   */
  TCreationAttributes extends object = TModelAttributes,
> = {
  /**
   * Function constructor
   */
  (
    sequelize: Sequelize,
  ): ModelStatic<
    Model<TModelAttributes, TCreationAttributes> & TModelAttributes
  >;
};
