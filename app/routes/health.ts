import express from 'express';

const router = express.Router();

router.get('/health', (_req, res) => {
  return res.status(200).json({
    message: 'okay',
  });
});

export default router;
