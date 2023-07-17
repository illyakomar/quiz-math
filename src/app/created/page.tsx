"use client";

import { AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from 'next/navigation'

import Button from "@/components/ui/Button";
import Card from "@/components/card/Card";

export default function Created() {
  const router = useRouter()

  return (
    <div className="page">
      <div className="page__title-container">
        <div className="page__title">
          <span>Створені тести</span>
        </div>
        <Button color="primary" onClick={() => router.push('created/add')}>
          <AiFillPlusCircle />
          Додати тест
        </Button>
      </div>
      <div className="page__line" />
      <div className="page__card-container">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
