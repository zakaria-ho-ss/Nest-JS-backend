import * as dotenv from 'dotenv';
dotenv.config();
//hello
export default {
  database: {
    mongoDB_Cluster: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_PROVIDER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  },
};
