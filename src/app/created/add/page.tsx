"use client";

import Questions from "@/components/questions/Questions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AddQuiz() {
  
  return (
  <div className="page">
    <div className="page__title-container">
      <div className="page__title">
        <span>Створити тест</span>
      </div>
    </div>
    <div className="page__line" />
    <div className="page__input-quiz">
      <Input name={"text"} label={"Назва тесту"} placeholder="Назва" />
    </div>
    <div className="page__question-container">
    <Questions/>
    </div>
    <div className="page__button-footer">
      <Button color="secondary" >
        Назад
      </Button>
      <Button color="primary" >
        Створити
      </Button>
    </div>

  </div>
  );
}
  