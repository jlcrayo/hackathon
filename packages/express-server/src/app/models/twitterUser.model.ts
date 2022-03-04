import {Document, Model, Schema} from "mongoose";
import {TwitterUser} from "@hackathon1021/kafka";
import * as mongoose from "mongoose";


interface TwitterUserDocument extends Document{
  user_id?: string,
  name?: string,
  image_url?: string,
  username: string,
  url?: string

}

const twitterUserSchema = new Schema(
  {
    user_id: {
      type: String,
      unique: true,
      index:true
    },
    name: String,
    image_url: String,
    username: {
      type: String,
      unique: true,
      required: true,
      index: true
    },
    url: String
  }
);


const TwitterUser: Model<TwitterUserDocument> = mongoose.model('TwitterUser', twitterUserSchema);

export {TwitterUser, TwitterUserDocument}
