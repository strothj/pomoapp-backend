import { AppConfig, DatabaseService } from './core';

let db: DatabaseService;

async function startApp(config: AppConfig) {
  db = new DatabaseService(config);
  try {
    await db.connect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export { startApp };
