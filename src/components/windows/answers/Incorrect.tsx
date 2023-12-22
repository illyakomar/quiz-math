import Image from 'next/image';

interface IProps {
  show: boolean;
}

export default function IncorrectAnswerWindow(props: IProps) {
  const { show } = props;

  return (
    <div className={`page-answer__container ${!show && 'hide'}`}>
      <div className='page-answer page-answer-incorrect'>
        <div className='page-answer__title-container page-answer__title-container-incorrect'>
          <h2 className='page-answer__title'>Відповідь неправильна</h2>
        </div>
        <div className='page-answer__image-container page-answer__image-container-incorrect'>
          <Image src={'/girlMeditating.png'} width={340} height={150} alt='' priority />
        </div>
      </div>
    </div>
  );
}
