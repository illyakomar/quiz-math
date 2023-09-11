import Button from "@/components/ui/Button";

export default function Active() {
  return (
    <div className="active-page">
      <div className="course-page__name-container">
        <span>Активні тести</span>
      </div>
      <div className="course-page__button-container">
        <Button color="primary">
          Додати тест
        </Button>
      </div>
    </div>
  );
}
