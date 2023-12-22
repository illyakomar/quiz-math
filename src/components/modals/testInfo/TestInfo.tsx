'use client';

import { QRCodeSVG } from 'qrcode.react';
import { AiFillCopy, AiOutlineClose } from 'react-icons/ai';
import { Modal } from 'react-responsive-modal';

import Button from '@/components/ui/Button';
import { notifySuccess } from '@/lib/helpers';

interface IProps {
  id: string;
  onStart: boolean;
  handleClose: () => void;
}

const TestInfo = (props: IProps) => {
  const { id, onStart, handleClose } = props;

  const testURL = `${process.env.NEXT_PUBLIC_URL}/${id}`;

  const handleCopyClick = () => {
    notifySuccess('Посилання успішно скопійовано!');
    navigator.clipboard.writeText(testURL);
  };

  return (
    <Modal
      open={onStart}
      onClose={handleClose}
      center
      classNames={{ modal: 'quiz-modal' }}
      focusTrapped={false}
      closeIcon={<AiOutlineClose size={22} />}
    >
      <div className='question-modal'>
        <p className='question-modal__title'>
          Для того, щоб приєднатися для проходження тесту, відскануйте Qr-код:
        </p>
        <div className='question-modal__code'>
          <QRCodeSVG value={testURL} size={250} />
        </div>
        <p className='question-modal__title'>або перейдіть за посиланням:</p>
        <div className='question-modal__form'>
          <div className='question-modal__input'>{testURL}</div>
          <Button color='primary' form='rounded' onClick={handleCopyClick}>
            <AiFillCopy size={25} />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TestInfo;
