import mongoose from 'mongoose';

import EnvService from '@/env/service';
import { EnvEnum } from '@/env/enum';

const connect = async () => {
  try {
    mongoose.connect(EnvService.get(EnvEnum.DB_URL) ?? '');
  } catch (error) {
    console.log(error);
  }
};

export default connect;
