'use client';

import { String2HexCodeColor } from 'string-to-hex-code-color';

const Answer = () => {
  const colorCourse = new String2HexCodeColor(0.2);
  const color = colorCourse.stringToColor('Робота зіd');
  return (
    <div className='answer-card' style={{ backgroundColor: color }}>
      <p className='answer-card__text'>Робота зі зв’язаними списками у мові Pascal</p>
    </div>
  );
};

export default Answer;
