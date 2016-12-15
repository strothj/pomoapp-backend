/**
 * Application entry point.
 */
import * as express from 'express';
import * as path from 'path';

const staticPath = path.resolve(__dirname, '../public/static');
const indexPath = path.resolve(__dirname, '../public/index.html');

const app = express();

app.use('/static', express.static(staticPath));

app.use('*', (_, res) => {
  res.sendFile(indexPath);
});

function runServer(cb?: (err?: Error) => void) {
  const port = process.env.PORT || 8080;
  app.listen(port).on('error', (err: Error) => {
    if (cb) {
      cb(err);
    }
  });
  console.log(`Listening on port: ${port}`); // tslint:disable-line:no-console
  cb();
}

if (require.main === module) {
  runServer((err: Error) => {
    if (err) {
      console.error(err); // tslint:disable-line:no-console
      process.exit(1);
    }
  });
}
