"use client";

import React from "react";
import Questions from "@/components/questions/Questions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Question } from "@/lib/types/entities";

interface Props {
  id: string;
  name: string;
  question: Question[];
}

const QuestionInfo = (props: Props) => {
  const { name, id, question } = props;

  return (
    <>
      <div className='page__input-quiz'>
        <Input name='text' label='Назва тесту' value={name} placeholder='Назва' />
      </div>
      <div className='page__question-container'>
        <Questions />
      </div>
      <div className='page__button-footer'>
        <Button color='secondary'>Назад</Button>
        <Button color='primary'>Створити</Button>
      </div>
    </>
  );
};

export default QuestionInfo;
