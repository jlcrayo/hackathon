import {Router} from "express";
import tweetsRouter from "./tweet.route";
import twitterUsersRouter from "./twitterUser.route";


const AppRouter = () => {
  const router = Router();

  router.use('/tweets', tweetsRouter());
  router.use('/twitter-users', twitterUsersRouter());

  return router;
}

export default AppRouter;
