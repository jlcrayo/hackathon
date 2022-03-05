import { sendMessage } from '@hackathon1021/kafka';
import { Router } from 'express';
import { upsertTwitterUserByUsername } from '../service/twitterUser.service';
import { kafkaClient } from '../../main';

const twitterUsersRouter = () => {
  const router = Router();

  router.post('/analyze', async (req, res) => {
    await upsertTwitterUserByUsername(req.body.username,{username: req.body.username})
    sendMessage(kafkaClient, 'target-users', [{value:JSON.stringify({username:req.body.username})}])


    return res.status(200);

  });


  return router;
};

export default twitterUsersRouter;
