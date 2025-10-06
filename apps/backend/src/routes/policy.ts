// for future use
import express from 'express';

const router = express.Router();

router.get('/policy', (req, res) => {
  res.send('Policy endpoint');
});

export default router;