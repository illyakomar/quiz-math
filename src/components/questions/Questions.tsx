"use client";

import React from "react";
import { AiOutlinePlus} from "react-icons/ai";
import Question from "../question/Question";

const Questions = () => {

  return (
    <div className='questions'>
      <p className='questions__title'>Питання:</p>
      <div className='questions__list'>
        <Question />
        <Question />
        <Question />
      </div>
      <div className="questions__button-container">
        <div className="questions__button">
          <AiOutlinePlus size={22} />
          <p>Додати</p>
        </div>
      </div>
    </div>
  );
};

export default Questions;