"use client";

import React from "react";
import { Modal } from "react-responsive-modal";
import { AiOutlineClose, AiFillCopy } from "react-icons/ai";
import { QRCodeSVG } from "qrcode.react";

import Button from "@/components/ui/Button";

interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const QuizInfo = (props: IProps) => {
  const { onStart, handleClose } = props;

  return (
    <Modal
      open={onStart}
      onClose={handleClose}
      center
      classNames={{ modal: "quiz-modal" }}
      focusTrapped={false}
      closeIcon={<AiOutlineClose size={22} />}
    >
      <div className='question-modal'>
        <p className='question-modal__title'>
          Для того, щоб приєднатися для проходження тесту, відскануйте Qr-код:
        </p>
        <div className='question-modal__code'>
          <QRCodeSVG value='http://localhost:3000/created/65045fac163735c3fa3df29c' size={250} />
        </div>
        <p className='question-modal__title'>або перейдіть за посиланням:</p>
        <div className='question-modal__form'>
          <div className='question-modal__input'>
            http://localhost:3000/65045fac163735c3fa3df29c
          </div>
          <Button
            color='primary'
            form='rounded'
            onClick={() => {
              navigator.clipboard.writeText("http://localhost:3000/65045fac163735c3fa3df29c");
            }}
          >
            <AiFillCopy size={25} />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default QuizInfo;
