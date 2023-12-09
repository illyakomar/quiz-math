import Card from '@/components/card/Card';
import Test from '@/database/test/schemas/test.schema';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';

export default async function ActiveTests() {
  await connectDb();

  const tests = await Test.find({ status: 'ACTIVE' });

  const listCard = tests.map((test) => (
    <Card
      key={test._id}
      id={test._id.toString()}
      name={test.title}
      color={test.color}
      route='active'
    />
  ));

  return (
    <>
      <div className='page__title-container'>
        <div className='page__title'>
          <span>Активні тести</span>
        </div>
      </div>
      <div className='page__line' />
      <div className='page__card-container'>{listCard}</div>
    </>
  );
}
