'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { String2HexCodeColor } from 'string-to-hex-code-color';

import QuestionModal from '@/components/modals/question/Question';
import Question from '@/components/question/Question';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { QuestionInput } from '@/database/shared/schemas/question.schema';
import { TestTemplateOutput } from '@/database/test-template/test-template.schema';
import { TestTemplateApiService } from '@/lib/api/services/test-template.api-service';
import { notifyError, notifyLoading, notifySuccess, removeNotification } from '@/lib/helpers';
import { FormMode } from '@/lib/types';
import { testSchema } from './schemas';
import { TestSchemaType } from './types';

import '@/styles/components/_questions.scss';

const modeNoftificationTexts = {
  create: {
    success: 'Тест успішно створено!',
    loading: 'Створення тесту...',
  },
  edit: {
    success: 'Тест успішно оновлено!',
    loading: 'Оновлення тесту...',
  },
};

interface Props extends Partial<TestTemplateOutput> {
  mode: FormMode;
}

const TestForm = (props: Props) => {
  const { _id, title, questions, mode } = props;

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<FormMode>('create');
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(-1);

  const {
    control,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<TestSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(testSchema),
    defaultValues: { title, questions },
  });
  const formQuestions = useWatch({ control, name: 'questions' });

  const router = useRouter();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleCloseAnimationEnd = () => setSelectedQuestionIndex(-1);

  const handleQuestionAddStart = () => {
    setModalMode('create');
    handleShow();
  };

  const handleQuestionEditStart = (index: number) => {
    if (!formQuestions || !formQuestions.length) return;
    setSelectedQuestionIndex(index);
    setModalMode('edit');
    handleShow();
  };

  const handleQuestionDelete = (index: number) => {
    if (!formQuestions || !formQuestions.length) return;
    formQuestions.splice(index, 1);
    setValue('questions', formQuestions);
    if (isSubmitted) trigger('questions');
  };

  const handleQuestionModalSumbit = (question: QuestionInput) => {
    const questions = formQuestions || [];
    if (modalMode === 'create') questions.push(question);
    else if (modalMode === 'edit' && selectedQuestionIndex !== -1)
      questions[selectedQuestionIndex] = question;
    setValue('questions', questions);
    if (isSubmitted) trigger('questions');
  };

  const handleFormSubmit = async (data: TestSchemaType) => {
    const notificationTexts = modeNoftificationTexts[mode];
    const notificationId = notifyLoading(notificationTexts.loading);
    const colorCourse = new String2HexCodeColor(0.5);
    const color = colorCourse.stringToColor(data.title);
    let result;
    if (mode === 'create') {
      result = await TestTemplateApiService.createOne({ ...data, color });
    } else if (_id) {
      result = await TestTemplateApiService.updateOne(_id, { ...data, color });
    } else {
      result = { error: 'Сталася невідома помилка' };
    }
    removeNotification(notificationId);
    if (result.error) {
      notifyError(result.error);
      return;
    }
    notifySuccess(notificationTexts.success);
    router.refresh();
    router.push('/created');
  };

  const renderQuestionsList = () => {
    return formQuestions?.map(({ text }, index) => (
      <Question
        key={index}
        index={index + 1}
        text={text}
        onStartEdit={() => handleQuestionEditStart(index)}
        onDelete={() => handleQuestionDelete(index)}
      />
    ));
  };

  return (
    <>
      <QuestionModal
        {...(formQuestions && formQuestions[selectedQuestionIndex])}
        mode={modalMode}
        show={showModal}
        onSubmit={handleQuestionModalSumbit}
        onClose={handleClose}
        onCloseAnimationEnd={handleCloseAnimationEnd}
      />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            <div className='questions__error-container'>
              {errors.questions && <p className='form-error'>{errors.questions.message}</p>}
            </div>
            <div className='questions__button-container'>
              <div className='questions__button' onClick={handleQuestionAddStart}>
                <AiOutlinePlus size={22} />
                <p>Додати питання</p>
              </div>
            </div>
          </div>
        </div>
        <div className='page__button-footer'>
          <Button color='secondary' onClick={() => router.push('/created')}>
            Назад
          </Button>
          <Button type='submit' color='primary'>
            {mode === 'create' ? 'Створити' : 'Оновити'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default TestForm;
