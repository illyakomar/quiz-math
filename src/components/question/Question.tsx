"use client";

import React from "react";
import { AiFillEdit, AiFillDelete} from "react-icons/ai";

const Question = () => {

  return (
    <div className='question'>
      <p className='question__text'>№1</p>
      <p className='question__text'>Які структури даних реалізовує мова програмування JS та інші мови програмування </p>
      <div className="question__icon-container">
          <AiFillEdit className="question__icon" />
          <AiFillDelete className="question__icon" />
      </div>
    </div>
  );
};

export default Question;