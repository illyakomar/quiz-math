import Button from "@/components/ui/Button";

export default function Active() {
  return (
    <div className="active-page">
      <div className="course-page__name-container">
        <span>Мої курси</span>
      </div>
      <div className="course-page__button-container">
        <Button>
          Додати курс
        </Button>
      </div>
    </div>
  );
}
