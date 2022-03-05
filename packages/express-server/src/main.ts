import * as express from 'express';
import * as cors from 'cors';
import AppRouter from "./app/routes";
import {connectToDatabase} from "./app/mongo";
import {configKafkaClient, consumeMessages, TweetSentimentEvent, KafkaConsumer} from "@hackathon1021/kafka";
import { createTweet } from './app/service/tweet.service';

const app = express();
app.use(express.json())
app.use(cors());

app.use('/',AppRouter());

export const kafkaClient = configKafkaClient("express-server");


const start = async () => {
  console.log('Starting express-server...');

  await connectToDatabase();

  app.listen(3001, () => {
    console.log(`Listening at http://localhost:${3001}`);
  });
  const consumerFunction:KafkaConsumer<TweetSentimentEvent> = async (kafka, event) => {
    createTweet(event);

  }

  consumeMessages(kafkaClient,"express-server", "analyzed-tweets",consumerFunction )
}



start();


