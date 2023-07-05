import React from "react";
import Link from "next/link";
import { sidebarData } from "./constant";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__container">
        <a className="sidebar__logo">QuizMath</a>
        <ul className="sidebar__list">
          {sidebarData.map((link) => (
            <li key={link.id} className="sidebar__item">
              <Link className="sidebar__item-container" href={link.url}>
                <div className="sidebar__icon">{link.icon}</div>
                <span className="sidebar__title">{link.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
