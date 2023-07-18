import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export default function Input({ name, label, ...attributes }: Props) {
  return (
    <div className="input-wrapper">
      <label className="input-wrapper__title" htmlFor={name}>{label}</label>
      <input className="input-wrapper__input" id={name} {...attributes}></input>
    </div>
  );
}
