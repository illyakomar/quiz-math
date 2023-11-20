'use client';

import '@/styles/components/_results.scss';

const Participant = () => {
  return (
    <div className='participant'>
      <p className='participant__text'>Абристович Олександ</p>
      <div className='answears-container'>
        <div className='answears-container__correct'>10</div>
        <div className='answears-container__incorrect'>10</div>
      </div>
    </div>
  );
};

export default Participant;
