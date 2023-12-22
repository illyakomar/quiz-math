import Image from 'next/image';

interface IProps {
  title: string;
}

export default function EmptyListWindow(props: IProps) {
  const { title } = props;

  return (
    <div className='page__center-container'>
      <Image src={'/manNotes.png'} width={150} height={200} alt='' priority />
      <div className='page-empty__title'>{title}</div>
    </div>
  );
}
