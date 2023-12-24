'use client';

import { useRef, useState } from 'react';

import { TestOutput } from '@/database/test/schemas/test.schema';
import CorrectAnswerWindow from '@/components/windows/answers/Correct';
import IncorrectAnswerWindow from '@/components/windows/answers/Incorrect';
import ResultsTestingWindow from '@/components/windows/testing/Results';
import LoadingWindow from '@/components/windows/loading/Loading';
import { TestApiService } from '@/lib/api/services/test.api-service';
import { ParticipantInput } from '@/database/test/schemas/participant.schema';
import { notifyError } from '@/lib/helpers';
import { ApiErrorMessageEnum } from '@/lib/api/error-messages/api-error-message.enum';
import ApiErrorMessageService from '@/lib/api/error-messages/api-error-message.service';
import { notificationLastingTime, testingAnswerColors } from './constants';
import TestingAnswer from '../../answers/Testing';

interface IProps extends Pick<TestOutput, '_id' | 'questions'> {
  participantFullName: string;
}

const TestingControl = (props: IProps) => {
  const { _id, questions, participantFullName } = props;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const participant = useRef<ParticipantInput>({
    fullName: participantFullName,
    correctAnswersCount: 0,
  });

  const handleNextQuestion = async () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      return;
    }
    setIsSubmitting(true);

    const result = await TestApiService.updateOneParticipants(_id, {
      participants: [participant.current],
    });
    if (result.error) {
      notifyError(ApiErrorMessageService.get(ApiErrorMessageEnum.INTERNAL_SERVER_ERROR));
      return;
    }
    setIsSubmitting(false);
    setShowResults(true);
  };

  const notifyCorrectAnswer = () => {
    setShowCorrect(true);
    setTimeout(() => {
      handleNextQuestion();
      setShowCorrect(false);
    }, notificationLastingTime);
  };

  const notifyIncorrectAnswer = () => {
    setShowIncorrect(true);
    setTimeout(() => {
      handleNextQuestion();
      setShowIncorrect(false);
    }, notificationLastingTime);
  };

  const handleAnswerClick = (index: number) => {
    if (questions[questionIndex].answers[index].isCorrect) {
      participant.current.correctAnswersCount++;
      notifyCorrectAnswer();
    } else {
      notifyIncorrectAnswer();
    }
  };

  const answersList = questions[questionIndex].answers.map((answer, index) => (
    <TestingAnswer
      key={index}
      text={answer.text}
      backgroundColor={testingAnswerColors[index]}
      onClick={() => handleAnswerClick(index)}
    />
  ));

  if (isSubmitting) return <LoadingWindow />;

  if (showResults)
    return (
      <ResultsTestingWindow
        correctAnswerCount={participant.current.correctAnswersCount}
        incorrectAnswersCount={questions.length - participant.current.correctAnswersCount}
      />
    );

  return (
    <>
      <CorrectAnswerWindow show={showCorrect} />
      <IncorrectAnswerWindow show={showIncorrect} />
      {!showCorrect && !showIncorrect && (
        <div className='testing'>
          <h1 className='testing__quiz-logo quiz-logo'>QuizMath</h1>
          <div className='question-container'>
            <div className='question-container__counter'>
              {questionIndex + 1} з {questions.length}
            </div>
            <div className='question-container__quiz-name'>{questions[questionIndex].text}</div>
          </div>
          <div className='answers-container'>{answersList}</div>
        </div>
      )}
    </>
  );
};

export default TestingControl;
