import express from 'express';
import path from 'path';

const staticPath = path.resolve(__dirname, '../public/static');
const indexPath = path.resolve(__dirname, '../public/index.html');
const singlePageRoutes = [
  /^\/(index\.html)?$/,
  '/login',
  '/projects',
];

const app = express();

app.use(singlePageRoutes, (req, res) => {
  res.sendFile(indexPath);
});

app.use('/static', express.static(staticPath));

function runServer(cb) {
  const port = process.env.PORT || 8080;
  app.listen(port);
  console.log(`Listening on port: ${port}`); // eslint-disable-line no-console
  if (cb) cb();
}

if (require.main === module) {
  runServer((err) => {
    if (!err) return;
    console.error(err); // eslint-disable-line no-console
  });
}

export { runServer, app };
