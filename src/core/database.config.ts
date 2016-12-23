const defaultConnectionString = 'mongodb://127.0.0.1/test';

class DatabaseConfig {
  public connectionString: string;

  public load() {
    this.connectionString = process.env.DB || defaultConnectionString;
  }
}

export { DatabaseConfig };
