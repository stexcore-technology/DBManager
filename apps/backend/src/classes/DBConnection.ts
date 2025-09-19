import { Dialect, QueryTypes, Sequelize } from 'sequelize';
import { IConnection } from '../models/connection.model';

type IDBConnectionConfig = IConnection;

export class DBConnection implements IConnection {
  private sequelize: Sequelize;

  public get id(): number {
    return this.config.id;
  }
  public set id(id: number) {
    this.updateConfig({ id });
  }

  public get dialect(): Dialect {
    return this.config.dialect;
  }
  public set dialect(dialect: Dialect) {
    this.updateConfig({ dialect });
  }

  public get hostname(): string {
    return this.config.hostname;
  }
  public set hostname(hostname: string) {
    this.updateConfig({ hostname });
  }

  public get name(): string {
    return this.config.name;
  }
  public set name(name: string) {
    this.updateConfig({ name });
  }

  public get password(): string {
    return this.config.password;
  }
  public set password(password: string) {
    this.updateConfig({ password });
  }

  public get port(): number {
    return this.config.port;
  }
  public set port(port: number) {
    this.updateConfig({ port });
  }

  public get user(): string {
    return this.config.user;
  }
  public set user(user: string) {
    this.updateConfig({ user });
  }

  public get database(): string {
    return this.config.database;
  }
  public set database(database: string) {
    this.updateConfig({ database });
  }

  constructor(private config: IDBConnectionConfig) {
    this.sequelize = this.buildSequelize(config);
    console.log('Created!');
  }

  public updateConfig(config: Partial<IDBConnectionConfig>) {
    this.sequelize = this.buildSequelize({ ...this.config, ...config });
  }

  private async buildSchemes() {
    const schemes: string[] = [];

    switch (this.config.dialect) {
      case 'mysql':
      case 'mariadb':
        {
          const mysqlResult = await this.sequelize.query<{ id: string }>(
            'SHOW TABLES',
            {
              type: QueryTypes.SELECT,
            },
          );
          const tables = mysqlResult.map(
            (table: object) => Object.values(table)[0] as string,
          );

          schemes.push(...tables);
        }
        break;

      case 'mssql':
      case 'postgres':
        {
          const query = `SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema != 'pg_catalog' AND table_schema != 'information_schema' AND table_type = 'BASE TABLE'`;
          const pgTables = await this.sequelize.query<{
            table_schema: string;
            table_name: string;
          }>(query, {
            type: QueryTypes.SELECT,
          });

          schemes.push(
            ...pgTables.map(
              (table) => table.table_name + '.' + table.table_schema,
            ),
          );
        }
        break;

      case 'sqlite':
        // case "db2":
        // case "oracle":
        // case "snowflake":
        throw new Error(`Unknow dialect '${this.config.dialect}'`);

      default:
        throw new Error(`Unknow dialect '${this.config.dialect}'`);
    }

    console.log("SCHEMES:", schemes);
  }

  private buildSequelize(config: IDBConnectionConfig): Sequelize {
    // Create sequelize instance
    const sequelize = new Sequelize({
      username: config.user,
      password: config.password,
      host: config.hostname,
      port: config.port,
      dialect: config.dialect,
      database: config.database
    });

    setTimeout(() => {
      this.buildSchemes();
    });

    return sequelize;
  }
}
