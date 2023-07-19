import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
}

export default function Radio({ name, value, ...attributes }: Props) {
  return (
  <label className="radioBtn">
    <input name={name} value={value} type="radio" {...attributes} />
    <svg className="radioBtn__checkmark" xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">
      <path d="M30.2859 4.78358H27.7895C27.4395 4.78358 27.1074 4.9356 26.8931 5.19573L12.1681 22.8401L5.10737 14.3777C5.00056 14.2494 4.86442 14.1457 4.70916 14.0743C4.5539 14.0029 4.38357 13.9658 4.21094 13.9656H1.71451C1.47523 13.9656 1.34309 14.2257 1.48951 14.4013L11.2717 26.1237C11.7288 26.671 12.6074 26.671 13.0681 26.1237L30.5109 5.216C30.6574 5.04371 30.5252 4.78358 30.2859 4.78358Z"/>
    </svg>
  </label>
  );
}