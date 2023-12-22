import { getServerSession } from 'next-auth';

import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import Results from '@/components/forms/results/Results';
import TestService from '@/database/test/test.service';
import FinishedTestControl from '@/components/controls/test/Finished';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function FinishedTestInfo({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  await connectDb();

  const test = await TestService.selectOne(
    { _id: params.id, owner: session?.user.id },
    {},
    { owner: 0 },
  );

  return (
    <>
      <div className='page__title-button-container'>
        <div className='page__title-container'>
          <div className='page__title'>
            <span>{test.title}</span>
          </div>
        </div>
        <FinishedTestControl {...test} />
      </div>
      <div className='page__line' />
      <Results {...test} questionsCount={test.questions.length} />
    </>
  );
}
