import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Card from '@/components/card/Card';
import EmptyListWindow from '@/components/windows/emptyList/EmptyList';
import TestService from '@/database/test/test.service';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';

export default async function ActiveTests() {
  const session = await getServerSession(authOptions);

  await connectDb();

  const tests = await TestService.selectMany(
    { status: 'ACTIVE', owner: session?.user.id },
    {},
    { owner: 0 },
  );

  const testCardsList = tests.map((test, index) => <Card key={index} route='active' {...test} />);

  return (
    <>
      <div className='page__title-container'>
        <div className='page__title'>
          <span>Активні тести</span>
        </div>
      </div>
      <div className='page__line' />
      {testCardsList.length ? (
        <div className='page__card-container'>{testCardsList}</div>
      ) : (
        <EmptyListWindow title='Наразі немає жодного активного тесту' />
      )}
    </>
  );
}
