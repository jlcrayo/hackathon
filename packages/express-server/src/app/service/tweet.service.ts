import {TweetSentimentEvent} from "@hackathon1021/kafka";
import {PopulatedTweet, Tweet} from "../models/tweet.model";
import {findTwitterUserByUsername, upsertTwitterUserByUsername} from "./twitterUser.service";


export const createTweet = async (tweetEvent: TweetSentimentEvent) => {
  const user = await upsertTwitterUserByUsername(tweetEvent.user.username, tweetEvent.user);
  const newTweet = new Tweet({...tweetEvent, twitter_user: user.id});
  return Tweet.create(newTweet)

}

export const getTweetsByUserUsername = async (username:string) => {
  const user = await findTwitterUserByUsername(username);
  if(user){
    return Tweet.find({twitter_user: user._id}).sort({created_at: -1}).populate<Pick<PopulatedTweet, 'user'>>('twitter_user').exec();

  }else{
    return [];
  }
}

export const getAllTweets = async () => {
  return Tweet.find().sort({created_at: -1}).populate<Pick<PopulatedTweet, 'user'>>('twitter_user').exec();
}


