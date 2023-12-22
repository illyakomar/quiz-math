interface IProps {
  text: string;
  backgroundColor: string;
  onClick: () => void;
}

const TestingAnswer = (props: IProps) => {
  const { text, backgroundColor, onClick } = props;

  return (
    <div className='answer-card' style={{ backgroundColor }} onClick={onClick}>
      <p className='answer-card__text'>{text}</p>
    </div>
  );
};

export default TestingAnswer;
