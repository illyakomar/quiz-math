import Image from 'next/image';

interface IProps {
  show: boolean;
}

export default function CorrectAnswerWindow(props: IProps) {
  const { show } = props;

  return (
    <div className={`page-answer__container ${!show && 'hide'}`}>
      <div className='page-answer page-answer-correct'>
        <div className='page-answer__title-container page-answer__title-container-correct'>
          <h2 className='page-answer__title'>Відповідь правильна</h2>
        </div>
        <div className='page-answer__image-container'>
          <Image src={'/happyMan.png'} width={360} height={180} alt='' priority />
        </div>
      </div>
    </div>
  );
}
