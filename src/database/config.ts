import mongoose from 'mongoose';

import EnvService from '@/env/env.service';
import { EnvEnum } from '@/env/env.enum';

mongoose.Schema.Types.ObjectId.get((value) => value.toString());

const connect = async () => {
  try {
    mongoose.connect(EnvService.get(EnvEnum.DB_URL));
  } catch (error) {
    console.log(error);
  }
};

export default connect;
