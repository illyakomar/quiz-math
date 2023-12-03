import mongoose from 'mongoose';

abstract class UtilsService {
  public static async withMongooseTransaction<T = any>(
    fn: mongoose.mongo.WithTransactionCallback<T>,
    options?: mongoose.mongo.TransactionOptions,
  ): Promise<T> {
    const session = await mongoose.startSession();
    const result = await session.withTransaction(fn, options);
    await session.endSession();
    return result;
  }
}

export default UtilsService;
