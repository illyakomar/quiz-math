import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { AiFillPlusCircle } from 'react-icons/ai';

import Card from '@/components/card/Card';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import TestTemplateService from '@/database/test-template/test-template.service';
import EmptyListWindow from '@/components/windows/emptyList/EmptyList';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function CreatedTestTemlates() {
  const session = await getServerSession(authOptions);

  await connectDb();

  const testTemplates = await TestTemplateService.selectMany(
    { owner: session?.user.id },
    {},
    { owner: 0 },
  );

  const testTemplateCards = testTemplates.map((testTemplate, index) => (
    <Card key={index} route='created' {...testTemplate} />
  ));

  return (
    <>
      <div className='page__title-container'>
        <div className='page__title'>
          <span>Створені тести</span>
        </div>
        <Link href='created/create' className='btn primary'>
          <AiFillPlusCircle />
          Створити тест
        </Link>
      </div>
      <div className='page__line' />
      {testTemplateCards.length ? (
        <div className='page__card-container'>{testTemplateCards}</div>
      ) : (
        <EmptyListWindow title='Наразі немає жодного створеного тесту' />
      )}
    </>
  );
}
