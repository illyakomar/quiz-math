import { getServerSession } from 'next-auth';

import TestForm from '@/components/forms/test/Test';
import TestTemplateControl from '@/components/controls/TestTemplate';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import TestTemplateService from '@/database/test-template/test-template.service';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function CreatedTestTemplateInfo({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  await connectDb();

  const testTemplate = await TestTemplateService.selectOne({
    _id: params.id,
    owner: session?.user.id,
  });
  testTemplate.owner = testTemplate.owner.toString();

  return (
    <>
      <div className='page__title-button-container'>
        <div className='page__title-container'>
          <div className='page__title'>
            <span>Інформація про тест</span>
          </div>
        </div>
        <TestTemplateControl {...testTemplate} />
      </div>
      <div className='page__line' />
      <TestForm mode='edit' {...testTemplate} />
    </>
  );
}
