"use client";

import React from "react";
import Participant from "@/components/participant/Participant";
import TestControl from "@/components/testControl/TestControl";

const Results = () => {
  return (
    <>
      <p className='results__member'>10 учасників</p>
      <div className='results__buttons'>
        <TestControl />
      </div>
      <div className='results__form'>
        <p className='results__form__title'>Результати:</p>
        <div className='results__form__list'>
          <Participant />
          <Participant />
          <Participant />
        </div>
      </div>
    </>
  );
};

export default Results;
