import {connect} from "mongoose";

const connectToDatabase = async (): Promise<void> => {
  await connect(`mongodb://${process.env['MONGO_URL']}`);
};

export { connectToDatabase };
