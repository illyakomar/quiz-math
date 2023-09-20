import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: "primary" | "secondary";
  form?: "rounded";
}

export default function Button({ children, form, color, ...attributes }: Props) {
  return (
    <button type='button' className={`btn ${color} ${form}`} {...attributes}>
      {children}
    </button>
  );
}
