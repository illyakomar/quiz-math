'use client';

import Answer from '../answer/Answer';

const Passing = () => {
  return (
    <div className='passing'>
      <h1 className='passing__quiz-logo'>QuizMath</h1>
      <div className='question-container'>
        <div className='question-container__counter'>10 з 20</div>
        <div className='question-container__quiz-name'>
          Які структури даних реалізовує мова програмування Pascal? Які структури даних реалізовує
          мова програмування Pascal? мова програмування Pascal? мова програмування Pascal? мова
          програмування Pascal?
        </div>
      </div>
      <div className='answers-container'>
        <Answer />
        <Answer />
        <Answer />
        <Answer />
        <Answer />
      </div>
    </div>
  );
};

export default Passing;
