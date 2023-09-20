"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import QuizInfo from "../modals/quizInfo/QuizInfo";

interface Props {}

const TestControl = (props: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='page__button-footer'>
        <Button color='secondary'>Видалити</Button>
        <Button onClick={handleShow} color='primary'>
          Розпочати
        </Button>
      </div>
      <QuizInfo onStart={show} handleClose={handleClose} />
    </>
  );
};

export default TestControl;
