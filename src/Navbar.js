import React from "react";
import { Link } from "react-router-dom";
import Content from "./Content";

const Navbar = ({
  updateData,
  data,
  loading,
  handleActiveTab,
  toggleModal,
}) => {
  const navItems = ["Все матчи", "Онлайн", "Завершенные"];
  const navItemsRoutes = ["all", "online", "finished"];

  return (
    <div className="Navbar">
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            {navItems.map((navItem, i) => {
              let navItemStyle =
                data.activeTab === i ? "nav-link active" : "nav-link";
              return (
                <li className="nav-item" key={i}>
                  <Link
                    className={navItemStyle}
                    to={`/panel/${navItemsRoutes[i]}`}
                    onClick={() => handleActiveTab(i)}
                  >
                    {navItem}
                  </Link>
                </li>
              );
            })}

            <div className="btn-block">
              <button
                className="btn btn-success updateData-btn"
                onClick={updateData}
                disabled={loading && !data.modalActiveGame}
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  style={{
                    marginRight: "10px",
                    display:
                      loading && !data.modalActiveGame
                        ? "inline-block"
                        : "none",
                  }}
                ></span>
                {loading && !data.modalActiveGame
                  ? "Обновление данных..."
                  : "Обновить данные"}
              </button>
            </div>
          </ul>
        </div>
        <Content data={data} loading={loading} toggleModal={toggleModal} />
      </div>
    </div>
  );
};

export default Navbar;
