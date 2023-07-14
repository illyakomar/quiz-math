"use client";

import React from "react";
import Image from "next/image"

const Card = () => {

  return (
    <div className='card'>
      <div className="card__image-container">
        <Image src="/manMap.png" width={110} height={110} alt="Quiz" />
      </div>
      <p className='card__info'>Структури даних і абстрактні типи</p>
      <p className='card__info'>20 питань</p>
    </div>
  );
};

export default Card;