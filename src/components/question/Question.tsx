'use client';

import React from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import { QuestionInput } from '@/database/models/question.model';

interface Props extends Pick<QuestionInput, 'text'> {
  index: number;
  onStartEdit: () => void;
  onDelete: () => void;
}

const Question = (props: Props) => {
  const { index, text, onStartEdit, onDelete } = props;

  return (
    <div className='question'>
      <p className='question__text'>№{index}</p>
      <p className='question__text'>{text}</p>
      <div className='question__icon-container'>
        <AiFillEdit className='question__icon' onClick={onStartEdit} />
        <AiFillDelete className='question__icon' onClick={onDelete} />
      </div>
    </div>
  );
};

export default Question;
