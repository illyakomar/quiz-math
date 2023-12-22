import { getServerSession } from 'next-auth';

import Card from '@/components/card/Card';
import EmptyListWindow from '@/components/windows/emptyList/EmptyList';
import TestService from '@/database/test/test.service';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function FinishedTests() {
  const session = await getServerSession(authOptions);

  await connectDb();

  const tests = await TestService.selectMany(
    { status: 'FINISHED', owner: session?.user.id },
    {},
    { owner: 0 },
  );

  const testCards = tests.map((test, index) => <Card key={index} route='finished' {...test} />);

  return (
    <>
      <div className='page__title-container'>
        <div className='page__title'>
          <span>Завершені тести</span>
        </div>
      </div>
      <div className='page__line' />
      {testCards.length ? (
        <div className='page__card-container'>{testCards}</div>
      ) : (
        <EmptyListWindow title='Наразі немає жодного завершеного тесту' />
      )}
    </>
  );
}
