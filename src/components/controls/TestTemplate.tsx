'use client';

import { useRouter } from 'next/navigation';

import Button from '../ui/Button';
import { TestTemplateApiService } from '@/lib/api/services/test-template.api-service';
import { TestApiService } from '@/lib/api/services/test.api-service';
import { TestTemplateOutput } from '@/database/test-template/test-template.schema';
import { notifySuccess, notifyError, notifyLoading } from '@/lib/helpers';
import { useSession } from 'next-auth/react';
import ApiErrorMessageService from '@/lib/api/error-messages/api-error-message.service';

interface Props extends TestTemplateOutput {}

const TestTemplateControl = (props: Props) => {
  const { _id } = props;

  const { data: session } = useSession();

  const router = useRouter();

  const handleStart = async () => {
    if (!session) return;
    const notificationId = notifyLoading('Старт тестування...');
    const result = await TestApiService.createOne({
      ...props,
      status: 'ACTIVE',
      owner: session.user.id,
    });
    if (result.error) {
      notifyError(ApiErrorMessageService.get(result.error.message), { id: notificationId });
      return;
    }
    notifySuccess('Тестування успішно розпочато!', { id: notificationId });
    router.push(`/active/${result.data?._id}`);
    router.refresh();
  };

  const handleDelete = async () => {
    const notificationId = notifyLoading('Видалення тесту...');
    const result = await TestTemplateApiService.deleteOne(_id);
    if (result.error) {
      notifyError(ApiErrorMessageService.get(result.error.message), { id: notificationId });
      return;
    }
    notifySuccess('Тест успішно видалено!', { id: notificationId });
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
