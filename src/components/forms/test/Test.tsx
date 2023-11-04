'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlinePlus } from 'react-icons/ai';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { TestTemplateInput } from '@/database/models/testTemplate.model';
import { QuestionInput } from '@/database/models/question.model';
import { TestTemplateApiService } from '@/lib/api/services/testTemplate.service';
import QuestionModal from '@/components/modals/question/Question';
import Question from '@/components/question/Question';
import { testSchema } from './schemas';
import { TestSchemaType } from './types';

interface Props extends Partial<TestTemplateInput> {}

const TestForm = (props: Props) => {
  const { title } = props;
  let { questions } = props;

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionInput>();

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TestSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(testSchema),
    defaultValues: { title, questions },
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleCloseAnimationEnd = () => setSelectedQuestion(undefined);

  const handleQuestionAddStart = () => {
    setModalMode('create');
    handleShow();
  };

  const handleQuestionEditStart = (index: number) => {
    const questions = getValues('questions');
    if (!questions || !questions.length) return;
    setSelectedQuestion(questions[index]);
    setModalMode('edit');
    handleShow();
  };

  const handleQuestionAdd = (question: QuestionInput) => {
    const questions = getValues('questions') || [];
    questions.push(question);
    setValue('questions', questions);
  };

  const handleCreate = async (data: TestSchemaType) => {
    await TestTemplateApiService.createOne({ ...data, color: '#ffffff' });
  };

  const renderQuestionsList = () => {
    const questions = getValues('questions') || [];
    return questions?.map(({ text }, index) => (
      <Question
        key={index}
        index={index + 1}
        text={text}
        onStartEdit={() => handleQuestionEditStart(index)}
      />
    ));
  };

  return (
    <>
      <Toaster />
      <QuestionModal
        {...(selectedQuestion && selectedQuestion)}
        mode={modalMode}
        show={showModal}
        onSubmit={handleQuestionAdd}
        onClose={handleClose}
        onCloseAnimationEnd={handleCloseAnimationEnd}
      />
      <form onSubmit={handleSubmit(handleCreate)}>
        <div className='page__input-quiz'>
          <div className='form-input'>
            <Controller
              control={control}
              name='title'
              defaultValue=''
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  name='title'
                  label='Назва тесту'
                  placeholder='Назва'
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.title && <p className='form-error'>{errors.title.message}</p>}
          </div>
        </div>
        <div className='page__question-container'>
          <div className='questions'>
            <p className='questions__title'>Питання:</p>
            <div className='questions__list'>{renderQuestionsList()}</div>
            <div className='questions__button-container'>
              <div className='questions__button' onClick={handleQuestionAddStart}>
                <AiOutlinePlus size={22} />
                <p>Додати питання</p>
              </div>
            </div>
          </div>
        </div>
        <div className='page__button-footer'>
          <Button color='secondary'>Назад</Button>
          <Button type='submit' color='primary'>
            Створити
          </Button>
        </div>
      </form>
    </>
  );
};

export default TestForm;
