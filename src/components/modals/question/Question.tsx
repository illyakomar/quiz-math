'use client';

import { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import Input from '@/components/ui/Input';
import FormAnswer from '@/components/answers/Form';
import Button from '@/components/ui/Button';
import { QuestionInput } from '@/database/shared/schemas/question.schema';
import { AnswerInput } from '@/database/shared/schemas/answer.schema';
import { questionSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormMode } from '@/lib/types';
import { QuestionSchemaType } from './types';

const fieldArrayName = 'answers';

const fieldArrayInputDefaultValues: AnswerInput = { text: '', isCorrect: false };
const fieldArrayDefaultValues: AnswerInput[] = new Array(2).fill(fieldArrayInputDefaultValues);

interface Props extends Partial<QuestionInput> {
  mode: FormMode;
  show: boolean;
  onSubmit: (question: QuestionInput) => void;
  onClose: () => void;
  onCloseAnimationEnd: () => void;
}

const QuestionModal = (props: Props) => {
  const { text, answers, mode, show, onSubmit, onClose, onCloseAnimationEnd } = props;

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestionSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text,
      [fieldArrayName]: answers?.length ? answers : fieldArrayDefaultValues,
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: fieldArrayName });

  const handleQuestionSubmit = (data: QuestionSchemaType) => {
    onSubmit(data);
    onClose();
  };

  const handleAnimationEnd = () => {
    if (!show) {
      reset({ text: '', answers: fieldArrayDefaultValues });
      onCloseAnimationEnd();
    }
  };

  const removePreviousCorrectAnswer = () => {
    const answers = getValues('answers');
    setValue(
      'answers',
      answers.map(({ text }) => ({ text, isCorrect: false })),
    );
  };

  const addAnswerField = () => {
    if (fields.length < 8) append(fieldArrayInputDefaultValues);
  };

  const removeAnswerField = (index: number) => {
    if (fields.length > 2) remove(index);
  };

  useEffect(() => {
    if (text && answers?.length) reset({ text, answers });
  }, [reset, text, answers]);

  const answersInputs = fields.map((field, index) => {
    return (
      <FormAnswer
        key={field.id}
        index={index}
        control={control}
        value={field}
        error={errors.answers?.[index]?.text?.message}
        remove={removeAnswerField}
        onCorrectCheck={removePreviousCorrectAnswer}
      />
    );
  });

  return (
    <Modal
      open={show}
      onClose={onClose}
      onAnimationEnd={handleAnimationEnd}
      center
      classNames={{ modal: 'quiz-modal' }}
      focusTrapped={false}
      closeIcon={<AiOutlineClose size={22} />}
    >
      <div className='question-modal'>
        <p className='question-modal__title'>Питання:</p>
        <form onSubmit={handleSubmit(handleQuestionSubmit)}>
          <div className='form-input'>
            <Controller
              control={control}
              name='text'
              defaultValue=''
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  name='text'
                  label='Текст питання'
                  placeholder='Питання'
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.text && <p className='form-error'>{errors.text.message}</p>}
          </div>
          <div className='question-modal__answer-container'>{answersInputs}</div>
          <div className='question-modal__error-container'>
            {errors.isCoorectChoosen && (
              <p className='form-error'>{errors.isCoorectChoosen?.message}</p>
            )}
          </div>
          <div className='questions__button-container'>
            <div className='questions__button' onClick={addAnswerField}>
              <AiOutlinePlus size={22} />
              <p>Додати відповідь</p>
            </div>
          </div>
          <div className='question-modal__button-footer'>
            <Button onClick={onClose} color='secondary'>
              Назад
            </Button>
            <Button type='submit' color='primary'>
              {mode === 'create' ? 'Додати' : 'Редагувати'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default QuestionModal;
