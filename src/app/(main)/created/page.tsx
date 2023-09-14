import Card from "@/components/card/Card";
import TestButton from "@/components/ui/TestButton";
import connect from "@/database/connection";
import Test from "@/database/models/Test";

export default async function Created() {
  await connect();

  const tests = await Test.find();

  const listCard = tests.map((test) => (
    <Card key={test._id} id={test._id} name={test.title} />
  ));

  return (
    <>
      <div className="page__title-container">
        <div className="page__title">
          <span>Створені тести</span>
        </div>
        <TestButton />
      </div>
      <div className="page__line" />
      <div className="page__card-container">{listCard}</div>
    </>
  );
}
