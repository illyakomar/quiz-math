import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: 'primary' | 'secondary';
  form?: 'rounded';
}

export default function Button({ children, color, form, ...attributes }: Props) {
  return (
    <button type='button' className={`btn ${color} ${form && form}`} {...attributes}>
      {children}
    </button>
  );
}
