import express from 'express';

const router = express.Router();

router.get('/secret', (req, res) => {
  res.send('Secret endpoint');
});

export default router;
