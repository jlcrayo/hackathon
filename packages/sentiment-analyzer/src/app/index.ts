import {analyzeSentiment} from "./sentiment";
import {
  configKafkaClient,
  consumeMessages,
  KafkaConsumer,
  sendMessage,
  topicInitialization,
  TweetEvent
} from "@hackathon1021/kafka";
const tweetsConsumer:KafkaConsumer<TweetEvent> = async (kafka, tweet) => {
  console.log("Tweet received!");
  let sentiment = 0;
  if(tweet.lang === 'en'){
    sentiment = analyzeSentiment(tweet.text);
  }
  sendMessage(kafka, 'analyzed-tweets', [{value: JSON.stringify({...tweet,sentiment}) }]);
}
const start = async () => {
  const kafkaClient = configKafkaClient("sentiment-analyzer");
  await  topicInitialization(kafkaClient,['analyzed-tweets', 'tweet-events']);
  consumeMessages(kafkaClient,'sentiment-analyzer', 'tweet-events', tweetsConsumer);
}
export default start;