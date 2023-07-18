"use client";

import React from "react";
import { Modal } from 'react-responsive-modal';
import { AiOutlineClose } from "react-icons/ai";

import Input from "@/components/ui/Input";


interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const QuestionModal = (props: IProps) => {
  const { onStart, handleClose } = props;

  return (
    <Modal open={onStart} onClose={handleClose} center classNames={{ modal: 'quiz-modal' }}
      focusTrapped={false} closeIcon={<AiOutlineClose size={22} />} >
      <div className="question-modal">
        <p className='question-modal__title'>Питання:</p>
          <Input name={"text"} label={"Текст питання"} placeholder="Питання" />
      </div>
    </Modal>
  );
};

export default QuestionModal;