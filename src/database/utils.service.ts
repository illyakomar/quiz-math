import mongoose, { Document, HydratedDocument } from 'mongoose';

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

  public static stringifyId<T = any>(document: Document): T {
    return document.toObject({
      transform: (_, ret) => {
        ret._id = ret._id.toString();
        return ret;
      },
    });
  }
}

export default UtilsService;
