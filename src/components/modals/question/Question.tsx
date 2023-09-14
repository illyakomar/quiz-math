"use client";

import React from "react";
import { Modal } from "react-responsive-modal";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

import Input from "@/components/ui/Input";
import Answer from "@/components/answer/Answer";
import Button from "@/components/ui/Button";

interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const QuestionModal = (props: IProps) => {
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
      <div className="question-modal">
        <p className="question-modal__title">Питання:</p>
        <Input name="text" label="Текст питання" placeholder="Питання" />
        <div className="question-modal__answer-container">
          <Answer />
          <Answer />
        </div>
        <div className="questions__button-container">
          <div className="questions__button">
            <AiOutlinePlus size={22} />
            <p>Додати</p>
          </div>
        </div>
        <div className="question-modal__button-footer">
          <Button color="secondary">Назад</Button>
          <Button color="primary">Створити</Button>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;
