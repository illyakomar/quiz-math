'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '../../ui/Button';
import TestInfo from '../../modals/testInfo/TestInfo';
import { TestApiService } from '@/lib/api/services/test.api-service';
import { notifySuccess, notifyError, notifyLoading, removeNotification } from '@/lib/helpers';
import { TestOutput } from '@/database/test/schemas/test.schema';

interface Props extends TestOutput {}

const ActiveTestControl = (props: Props) => {
  const { _id, ...rest } = props;

  const [show, setShow] = useState(false);

  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleStop = async () => {
    const notificationId = notifyLoading('Завершення тестування...');
    const result = await TestApiService.updateOne(_id, { ...rest, status: 'FINISHED' });
    removeNotification(notificationId);
    if (result.error) {
      notifyError(result.error);
      return;
    }
    notifySuccess('Тестування успішно завершено!');
    router.push(`/finished/${result.data?._id}`);
    router.refresh();
  };

  return (
    <>
      <div className='page__button-footer'>
        <Button color='primary' onClick={handleShow}>
          Код тесту
        </Button>
        <Button color='secondary' onClick={handleStop}>
          Завершити
        </Button>
      </div>
      <TestInfo id={_id} onStart={show} handleClose={handleClose} />
    </>
  );
};

export default ActiveTestControl;
