import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({handleActiveBar, data}) => {
  const listGroupItems = [
    "Панель матчей",
    "Избранное",
    "Сохраненные",
    "Удаленные",
  ];
  const listGroupItemsRoutes = ["panel/all", "favorites", "saved", "deleted"];

  return (
    <div className="Sidebar">
      <div className="card">
        <ul className="list-group list-group-flush">
          {listGroupItems.map((item, i) => {
            let listItemStyle = data.activeBar === i ? "list-group-item active" : "list-group-item";

            return (
              <Link className={listItemStyle} key={i} to={`/${listGroupItemsRoutes[i]}`} onClick={() => handleActiveBar(i)}>
                {item}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
