import express from 'express';

const router = express.Router();

router.get('/vault', (req, res) => {
  res.send('Vault endpoint');
});

export default router;
