import Link from 'next/link';
import { AiFillPlusCircle } from 'react-icons/ai';

import Card from '@/components/card/Card';
import TestTemplate from '@/database/test-template/schemas/test-template.schema';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';

export default async function CreatedTestTemlates() {
  await connectDb();

  const tests = await TestTemplate.find();

  const listCard = tests.map((test) => (
    <Card
      key={test._id}
      id={test._id.toString()}
      name={test.title}
      color={test.color}
      route='created'
    />
  ));

  return (
    <>
      <div className='page__title-container'>
        <div className='page__title'>
          <span>Створені тести</span>
        </div>
        <Link href='created/add' className='btn primary'>
          <AiFillPlusCircle />
          Додати тест
        </Link>
      </div>
      <div className='page__line' />
      <div className='page__card-container'>{listCard}</div>
    </>
  );
}
