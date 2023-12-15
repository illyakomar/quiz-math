import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: 'primary' | 'secondary';
}

export default function Button({ children, color, ...attributes }: Props) {
  return (
    <button type='button' className={`btn ${color}`} {...attributes}>
      {children}
    </button>
  );
}
