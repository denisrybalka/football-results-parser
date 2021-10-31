import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Sidebar = ({ handleActiveBar, data }) => {
  const listGroupItems = [
    "Панель матчей",
    "Панель чемпионатов",
    "Сохраненные",
    "Скрытые",
  ];
  const listGroupItemsRoutes = [
    "panel/all",
    "championships",
    "saved",
    "hidden",
  ];

  React.useEffect(() => {
    const location = history.location.pathname;
    const activeBar = listGroupItemsRoutes.findIndex(
      (a) => a === location.slice(1)
    );
    handleActiveBar(activeBar);
  }, []);

  const history = useHistory();
  const isSidebarHidden =
    history.location.pathname.split("/").findIndex((a) => a === "team") !==
      -1 || data.teamInfo !== null;

  return (
    <div
      className="Sidebar"
      style={{ display: isSidebarHidden ? "none" : "block" }}
    >
      <div className="card">
        <ul className="list-group list-group-flush">
          {listGroupItems.map((item, i) => {
            let listItemStyle =
              data.activeBar === i
                ? "list-group-item active"
                : "list-group-item";

            return (
              <Link
                className={listItemStyle}
                key={i}
                to={`/${listGroupItemsRoutes[i]}`}
                onClick={() => handleActiveBar(i)}
              >
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
