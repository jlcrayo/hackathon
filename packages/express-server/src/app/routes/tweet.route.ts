import { Router } from 'express';

const tweetsRouter = () => {
  const router = Router();

  router.get('/', async (req, res) => {
    return res.status(200);
  });

  router.get('/user/:username', async (req, res) => {
    return res.status(200);
  });



  return router;
};

export default tweetsRouter;
