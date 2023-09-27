import mongoose from 'mongoose';

import EnvService from '@/env/env.service';
import { EnvEnum } from '@/env/env.enum';

const connect = async () => {
  try {
    mongoose.connect(EnvService.get(EnvEnum.DB_URL));
  } catch (error) {
    console.log(error);
  }
};

export default connect;
