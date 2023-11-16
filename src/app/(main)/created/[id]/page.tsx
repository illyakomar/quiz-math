import TestForm from '@/components/forms/test/Test';
import TestTemplate from '@/database/models/testTemplate.model';
import connect from '@/database/connection';
import TestControl from '@/components/testControl/TestControl';

export default async function Page({ params }: { params: { id: string } }) {
  await connect();

  const data = await TestTemplate.findById(params.id);
  const testTemplate = JSON.parse(JSON.stringify(data));

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
