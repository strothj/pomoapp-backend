import * as fs from 'fs';
import * as path from 'path';

const defaultStaticPath = '../node_modules/pomoapp-frontend/dist';
const defaultDBConnectionString = 'mongodb://127.0.0.1/pomoapp-test';

/**
 * Contains the application configuration.
 *
 * @class Config
 */
class Config {
  public readonly indexFilePath: string;
  public readonly staticPath: string;

  protected constructor(
    publicPath: string,
    public readonly databaseConnectionString: string,
    public readonly port: number
    ) {
    this.indexFilePath = path.join(publicPath, 'index.html');
    this.staticPath = path.join(publicPath, 'static');
  }

  /**
   * Loads the application configuration using environment variables.
   *
   * @static
   * @returns {Config}
   *
   * @memberOf Config
   */
  public static LOAD(): Config {
    const publicPath = process.env.PUBLIC_PATH || path.resolve(__dirname, defaultStaticPath);
    if (!fs.existsSync(publicPath)) {
      throw new Error(`Public asset path does not exist: ${publicPath}`);
    }

    const connectionString = process.env.MONGO || defaultDBConnectionString;
    const port = process.env.PORT || 8080;

    return new Config(publicPath, connectionString, port);
  }
}

export { Config };
