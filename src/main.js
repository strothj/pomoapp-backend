import express from 'express';

const app = express();
app.use(express.static('public'));

function runServer(cb) {
  const port = process.env.PORT || 8080;
  app.listen(port);
  console.log(`Listening on port: ${port}`); // eslint-disable-line no-console
  if (cb) cb();
}

if (require.main === module) {
  runServer((err) => {
    console.error(err); // eslint-disable-line no-console
  });
}

export { runServer, app };
