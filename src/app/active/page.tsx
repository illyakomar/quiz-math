export default function Active() {
  return (
    <div className="active-page">
      <div className="course-page__name-container">
        <span>Мої курси</span>
      </div>
      <div className="course-page__button-container">
        <Button
          type="primary"
          shape="round"
          icon={<PlusCircleOutlined className="icon" />}
          className="course-page__button-connect"
        >
          Додати курс
        </Button>
      </div>
    </div>
  );
}
