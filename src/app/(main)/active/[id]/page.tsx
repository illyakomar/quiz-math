import Results from '@/components/forms/results/Results';
import TestService from '@/database/test/test.service';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';

export default async function ActiveTestInfo({ params }: { params: { id: string } }) {
  await connectDb();

  const test = await TestService.selectOne({ _id: params.id });

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
