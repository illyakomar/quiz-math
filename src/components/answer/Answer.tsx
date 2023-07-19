"use client";

import React from "react";
import { AiFillDelete} from "react-icons/ai";

import Input from "@/components/ui/Input";
import Radio from "@/components/ui/Radio";

const Answer = () => {

  return (
    <div className='answer'>
      <div className="answer__radio">
        <Radio name="btn1" value="1" />
      </div>
      <Input name="text" label="Текст відповіді" placeholder="Відповідь" />
      <div className="answer__delete">
        <AiFillDelete size={25} className="answer__icon-delete" />
      </div>
    </div>
  );
};

export default Answer;