import express from 'express';
import path from 'path';

const app = express();
// app.use(express.static('public'));
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

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
