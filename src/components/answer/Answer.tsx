'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiFillDelete } from 'react-icons/ai';

import Input from '@/components/ui/Input';
import Radio from '@/components/ui/Radio';
import { AnswerInput } from '@/database/models/answer.model';

interface Props {
  index: number;
  control: any;
  value: AnswerInput;
  error?: string;
  remove: (index: number) => void;
  onCorrectCheck: () => void;
}

const Answer = (props: Props) => {
  const { index, control, error, remove, onCorrectCheck } = props;

  return (
    <div className='form-input'>
      <div className='answer'>
        <div className='answer__radio'>
          <Controller
            control={control}
            name={`answers.${index}.isCorrect`}
            render={({ field: { onChange, value } }) => (
              <Radio
                name='isCorrect'
                checked={value}
                onChange={(event) => {
                  onCorrectCheck();
                  onChange(event.target.checked);
                }}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name={`answers.${index}.text`}
          defaultValue=''
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              name={`answer.${index}.text`}
              label='Текст відповіді'
              placeholder='Відповідь'
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <div className='answer__delete' onClick={() => remove(index)}>
          <AiFillDelete size={25} className='answer__icon-delete' />
        </div>
      </div>
      {error && <p className='form-error'>{error}</p>}
    </div>
  );
};

export default Answer;
