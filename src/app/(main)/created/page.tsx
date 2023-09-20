import Card from "@/components/card/Card";
import connect from "@/database/connection";
import TestTemplate from "@/database/models/TestTemplate";
import Link from "next/link";
import { AiFillPlusCircle } from "react-icons/ai";

export default async function Created() {
  await connect();

  const tests = await TestTemplate.find();

  const listCard = tests.map((test) => (
    <Card
      key={test._id}
      id={test._id.toString()}
      name={test.title}
      color={test.color}
      route='created'
    />
  ));

  return (
    <>
      <div className='page__title-container'>
        <div className='page__title'>
          <span>Створені тести</span>
        </div>
        <Link href='created/add' className='btn primary'>
          <AiFillPlusCircle />
          Додати тест
        </Link>
      </div>
      <div className='page__line' />
      <div className='page__card-container'>{listCard}</div>
    </>
  );
}
