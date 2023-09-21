import QuestionInfo from "@/components/forms/questionInfo/QuestionInfo";

export default function AddQuiz() {
  return (
    <>
      <div className="page__title-container">
        <div className="page__title">
          <span>Створити тест</span>
        </div>
      </div>
      <div className="page__line" />
      <QuestionInfo id={""} name={""} question={[]} />
    </>
  );
}
