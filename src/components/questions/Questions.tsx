"use client";

import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Question from "../question/Question";
import QuestionModal from "../modals/question/Question";

const Questions = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="questions">
      <p className="questions__title">Питання:</p>
      <div className="questions__list">
        <Question />
        <Question />
        <Question />
      </div>
      <div className="questions__button-container">
        <div className="questions__button" onClick={handleShow}>
          <AiOutlinePlus size={22} />
          <p>Додати</p>
        </div>
      </div>
      <QuestionModal onStart={show} handleClose={handleClose} />
    </div>
  );
};

export default Questions;
