import { AiFillDiff, AiFillCarryOut, AiFillContainer } from 'react-icons/ai';

export const sidebarData = [
  {
    id: 1,
    url: '/created',
    title: 'Створені',
    icon: <AiFillDiff size={25} />,
  },
  {
    id: 2,
    url: '/active',
    title: 'Активні',
    icon: <AiFillCarryOut size={25} />,
  },
  {
    id: 3,
    url: '/finished',
    title: 'Завершені',
    icon: <AiFillContainer size={25} />,
  },
];
