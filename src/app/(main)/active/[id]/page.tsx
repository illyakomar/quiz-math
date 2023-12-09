import Results from '@/components/forms/results/Results';
import Test from '@/database/test/schemas/test.schema';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';

export default async function ActiveTest({ params }: { params: { id: string } }) {
  await connectDb();

  const test = await Test.findById(params.id);

  return (
    <>
      <div className='page__title-button-container'>
        <div className='page__title-container'>
          <div className='page__title'>
            <span>{test.title}</span>
          </div>
        </div>
      </div>
      <div className='page__line' />
      <Results {...test} />
    </>
  );
}
