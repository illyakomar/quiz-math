"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { BiSolidLogOut } from "react-icons/bi";

import { sidebarData } from "./constants";

const Sidebar = () => {
  const currentRoute = usePathname();

  const listSidebar = sidebarData.map((link) => (
    <li key={link.id}>
      <Link
        className={
          currentRoute.startsWith(link.url)
            ? "sidebar__item-container sidebar__active"
            : "sidebar__item-container"
        }
        href={link.url}
      >
        <div className="sidebar__icon">{link.icon}</div>
        <span className="sidebar__title">{link.title}</span>
      </Link>
    </li>
  ));

  return (
    <aside className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__header">
          <a className="sidebar__logo">QuizMath</a>
          <ul className="sidebar__list">{listSidebar}</ul>
        </div>
        <div className="sidebar__footer">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="sidebar__footer-button"
          >
            <div className="sidebar__icon">
              <BiSolidLogOut size={25} />
            </div>
            <span className="sidebar__title">Вихід</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
