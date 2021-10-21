import React from "react";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item active">Панель матчей</li>
          <li className="list-group-item">Избранное</li>
          <li className="list-group-item">Сохраненные</li>
          <li className="list-group-item">Удаленные</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
