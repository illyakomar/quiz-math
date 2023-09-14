"use client";

import React from "react";
import Button from "./Button";

import { AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";

const TestButton = () => {
  const router = useRouter();

  return (
    <Button color="primary" onClick={() => router.push("created/add")}>
      <AiFillPlusCircle />
      Додати тест
    </Button>
  );
};

export default TestButton;
