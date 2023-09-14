"use client";

import React from "react";
import Image from "next/image";
import Test from "@/database/models/Test";

interface Props {
  name: string;
  id: string;
}

const Card = (props: Props) => {
  const { name, id } = props;

  const onCardClick = () => console.log(id);

  return (
    <div className="card">
      <div className="card__image-container">
        <Image src="/manMap.png" width={110} height={110} alt="Quiz" />
      </div>
      <p className="card__info">{name}</p>
      <p className="card__info"></p>
    </div>
  );
};

export default Card;
