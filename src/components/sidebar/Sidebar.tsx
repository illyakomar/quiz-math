"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarData } from "./constants";
import { BiSolidLogOut } from "react-icons/bi";

const Sidebar = () => {
  const currentRoute = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__header">
          <a className="sidebar__logo">QuizMath</a>
          <ul className="sidebar__list">
            {sidebarData.map((link) => (
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
            ))}
          </ul>
        </div>
        <div className="sidebar__footer">
          <div className="sidebar__footer-container">
            <div className="sidebar__icon">
              <BiSolidLogOut size={25} />
            </div>
            <span className="sidebar__title">Вихід</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
