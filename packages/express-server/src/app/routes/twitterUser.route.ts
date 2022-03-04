import { Router } from 'express';

const twitterUsersRouter = () => {
  const router = Router();

  router.post('/analyze', async (req, res) => {


    return res.status(200);

  });


  return router;
};

export default twitterUsersRouter;
