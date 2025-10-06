import express from 'express';

import vaultRouter from './routes/vault';
import secretRouter from './routes/secret';
import policyRouter from './routes/policy';
import authRouter from './routes/auth';

const app = express();

app.use('/api', vaultRouter);
app.use('/api', secretRouter);
app.use('/api', authRouter);
app.use('/api', policyRouter);

const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || 'localhost';

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

const server = app.listen(PORT, () => {
  console.log(`Listening at http://${HOST}:${PORT}/api`);
});
server.on('error', console.error);
