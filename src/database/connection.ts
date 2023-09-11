import mongoose from 'mongoose';

const connect = async () => {
  try {
    mongoose.connect(process.env.DB_URL ?? '');
  } catch (error) {
    console.log(error);
  }
};

export default connect;
