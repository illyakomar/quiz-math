'use client';

import { useRouter } from 'next/navigation';

import Button from '../ui/Button';
import { TestTemplateApiService } from '@/lib/api/services/test-template.api-service';
import { TestApiService } from '@/lib/api/services/test.api-service';
import { TestTemplateOutput } from '@/database/test-template/test-template.schema';
import { notifySuccess, notifyError, notifyLoading, removeNotification } from '@/lib/helpers';

interface Props extends TestTemplateOutput {}

const TestTemplateControl = (props: Props) => {
  const { _id } = props;

  const router = useRouter();

  const handleStart = async () => {
    const notificationId = notifyLoading('Старт тестування...');
    const result = await TestApiService.createOne({ ...props, status: 'ACTIVE' });
    removeNotification(notificationId);
    if (result.error) {
      notifyError(result.error);
      return;
    }
    notifySuccess('Тестування успішно розпочато!');
    router.push(`/active/${result.data?._id}`);
    router.refresh();
  };

  const handleDelete = async () => {
    const notificationId = notifyLoading('Видалення тесту...');
    const result = await TestTemplateApiService.deleteOne(_id);
    removeNotification(notificationId);
    if (result.error) {
      notifyError(result.error);
      return;
    }
    notifySuccess('Тест успішно видалено!');
    router.push('/created');
    router.refresh();
  };

  return (
    <div className='page__button-footer'>
      <Button color='primary' onClick={handleStart}>
        Розпочати
      </Button>
      <Button color='secondary' onClick={handleDelete}>
        Видалити
      </Button>
    </div>
  );
};

export default TestTemplateControl;