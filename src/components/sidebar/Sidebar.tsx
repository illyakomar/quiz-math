'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BiSolidLogOut } from 'react-icons/bi';

import { sidebarData } from './constants';

import '@/styles/components/_sideBar.scss';

const Sidebar = () => {
  const currentRoute = usePathname();
  const [isMenuActive, setMenuActive] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setMenuActive(!isMenuActive);
  };

  const listSidebar = sidebarData.map((link) => (
    <li key={link.id} onClick={handleCheckboxChange}>
      <Link
        className={
          currentRoute.startsWith(link.url)
            ? 'sidebar__item-container sidebar__active'
            : 'sidebar__item-container'
        }
        href={link.url}
      >
        <div className='sidebar__icon'>{link.icon}</div>
        <span className='sidebar__title'>{link.title}</span>
      </Link>
    </li>
  ));

  return (
    <aside className='sidebar'>
      <input className='sidebar__side-menu' type='checkbox' defaultChecked={isMenuActive} />
      <label className='sidebar__hamb' onClick={handleCheckboxChange}>
        <span className='sidebar__hamb-line'></span>
      </label>
      <div className='sidebar__container'>
        <div className='sidebar__header'>
          <a className='sidebar__logo'>QuizMath</a>
          <ul className='sidebar__list'>{listSidebar}</ul>
        </div>
        <div className='sidebar__footer'>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className='sidebar__footer-button'
          >
            <div className='sidebar__icon'>
              <BiSolidLogOut size={25} />
            </div>
            <span className='sidebar__title'>Вихід</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
