import TestForm from '@/components/forms/test/Test';
import TestControl from '@/components/testControl/TestControl';
import { connectDb } from '@/utils/middleware/middleware/connect-db.middleware';
import TestTemplateService from '@/database/test-template/test-template.service';

export default async function CreatedTestTemplate({ params }: { params: { id: string } }) {
  await connectDb();

  const testTemplate = await TestTemplateService.selectOne({ _id: params.id });

  return (
    <>
      <div className='page__title-button-container'>
        <div className='page__title-container'>
          <div className='page__title'>
            <span>Інформація про тест</span>
          </div>
        </div>
        <TestControl _id={testTemplate._id} testTemplate={testTemplate} />
      </div>
      <div className='page__line' />
      <TestForm mode='edit' {...testTemplate} />
    </>
  );
}
