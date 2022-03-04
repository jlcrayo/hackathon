import {Kafka, Message} from 'kafkajs';



export const configKafkaClient = (clientId: string)=>{
  return new Kafka({
    clientId: clientId,
    brokers: ['localhost:9092'],
  });
}

export interface TwitterUser{
  user_id?: string,
  name?: string,
  image_url?: string,
  username: string,
  url?: string;
}

export interface TweetEvent {
  tweet_id: string,
  text: string;
  created_at?: string |undefined;
  author_id?: string | undefined;
  user: TwitterUser;
  lang?: string;
  url: string;
}


export interface TweetSentimentEvent extends TweetEvent{
  sentiment: number;
}


export interface UserTweetsEvent {
  username: string;
  last_tweet_id?: string;
}

export type KafkaConsumer<T> = (kafka: Kafka, event: T) => void

export type KafkaSender<T> = (kafka: Kafka, topic:string, messages: Array<T>) => void;

export const consumeMessages = async (kafka: Kafka, groupId: string, topic: string, callback: KafkaConsumer<any>) => {
  const consumer = kafka.consumer({groupId, allowAutoTopicCreation: true});
  await consumer.subscribe({topic});
  await consumer.run({
    eachMessage: async ({message}) => {
      console.log(`Kafka event received from topic ${topic}! Consuming it...`)

      if(message.value){
        callback(kafka,JSON.parse(message.value.toString()));
      }
    }
  })

}

export const sendMessage = async (kafka: Kafka, topic: string, messages:Message[])=> {
  const producer = kafka.producer({allowAutoTopicCreation: true});
  await producer.connect();
  await producer.send({topic, messages});
  await producer.disconnect();

  console.log(`📨 Published ${messages.length} messages to topic ${topic}`);
}

export const topicInitialization = async (kafka: Kafka, topics: string[]) => {
  const admin = kafka.admin()


  await admin.connect()

  const currentTopics = await admin.listTopics();

  const topicsToCreate = topics.filter(t => !currentTopics.find(ct => t ===ct));

  if(topicsToCreate.length > 0){
    console.log(`Missing topics: ${topicsToCreate} in broker, going to create them`);
    await admin.createTopics({
      waitForLeaders: true,
      topics: topicsToCreate.map(t => ({
        topic: t,
        numPartitions: 1,
        replicationFactor: 1
      })),
    });

    console.log(`Topics created!`);
  }
}


export const sendTargetUserEvents: KafkaSender<UserTweetsEvent> = async (kafka:Kafka, topic, messages) => {
  sendMessage(kafka, topic, messages.map(userTweetEvent =>({value: JSON.stringify(userTweetEvent)})));
}
