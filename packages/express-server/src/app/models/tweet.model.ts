import {Document, Schema, Model} from 'mongoose';
import {TweetSentimentEvent} from "@hackathon1021/kafka";
import * as mongoose from "mongoose";
import {TwitterUserDocument} from "./twitterUser.model";

type TweetDocument = Document & Omit<TweetSentimentEvent, 'user'> & {
  user: string;
};

type PopulatedTweet = {
  user: TwitterUserDocument;
}

const tweetSchema = new Schema(
  {
    tweet_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
    },
    created_at: Date,
    author_id: String,
    lang: String,
    url: String,
    sentiment: Number,
    twitter_user: {
      type: mongoose.Schema.Types.ObjectId, ref: "TwitterUser"
    }
  }
);

const Tweet: Model<TweetDocument> = mongoose.model('Tweet', tweetSchema);

export {Tweet, TweetDocument, PopulatedTweet}
