import Image from 'next/image';

interface IProps {
  correctAnswerCount: number;
  incorrectAnswersCount: number;
}

const ResultsTestingWindow = (props: IProps) => {
  const { correctAnswerCount, incorrectAnswersCount } = props;

  return (
    <div className='testing-results'>
      <h1 className='quiz-logo'>QuizMath</h1>
      <div className='testing-results__results-container'>
        <div className='testing-results__results'>
          <Image src={'/womanBackpack.png'} width={200} height={550} alt='' priority />
          <div className='testing-results__results-content'>
            <h2 className='testing-results__results-title'>Результати:</h2>
            <div className='testing-results__result-container testing-results__result-container-correct'>
              <h3 className='testing-results__result-text'>
                Правильних відповідей: {correctAnswerCount}
              </h3>
            </div>
            <div className='testing-results__result-container testing-results__result-container-incorrect'>
              <h3 className='testing-results__result-text'>
                Неправильних відповідей: {incorrectAnswersCount}
              </h3>
            </div>
          </div>
          <Image src={'/manPhone.png'} width={250} height={550} alt='' priority />
        </div>
      </div>
    </div>
  );
};

export default ResultsTestingWindow;
