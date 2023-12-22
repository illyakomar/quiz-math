import { getServerSession } from 'next-auth';

import Results from '@/components/forms/results/Results';
import ActiveTestControl from '@/components/controls/test/Active';
import TestService from '@/database/test/test.service';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ActiveTestInfo({ params }: { params: { id: string } }) {
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
        <ActiveTestControl {...test} />
      </div>
      <div className='page__line' />
      <Results {...test} questionsCount={test.questions.length} />
    </>
  );
}
