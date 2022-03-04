import {TwitterUser} from "@hackathon1021/kafka";
import {TwitterUser as TwitterUserModel, TwitterUserDocument} from '../models/twitterUser.model';


export const createTwitterUser = async (twitterUser: TwitterUser) =>{
  return TwitterUserModel.create(twitterUser);
}

export const upsertTwitterUserByUsername = async (username: string, userData: TwitterUser) => {
  const user = await findTwitterUserByUsername(username);
  if(user){
    return TwitterUserModel.findByIdAndUpdate(user.id, userData, {new: true}).exec();
  }else{
    return createTwitterUser(userData);
  }

}

export const findTwitterUserByUsername = async (username: string)=>  {
  return TwitterUserModel.findOne<TwitterUserDocument>({username}).exec();


}

export const findTwitterUserByTwitterId = (twitterId: string) => {
  return TwitterUserModel.findOne({user_id: twitterId}).exec();
}
