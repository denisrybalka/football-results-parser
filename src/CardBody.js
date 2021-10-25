import React from "react";

const CardBody = ({ toggleModal, game }) => {
  const championship = game.championship;
  let color = championship.split(",").slice(0, -1).join(",");
  let style = "";

  const championshipColors = {
    "Чемпионат Англии, Премьер-лига": ["purple", "white"],
    "Чемпионат Германии, Бундеслига": ["red", "white"],
    "Чемпионат Испании, Примера": ["#fbec21", "black"],
    "Чемпионат Италии, Серия А": ["#008fd7", "white"],
    "Чемпионат Франции, Лига 1": ["#dae025", "#12233f"],
    "Чемпионат Украины, Премьер-лига": ["white", "skyblue"],
  };

  return (
    <div className="col">
      <div
        className="card h-100"
        style={{
          backgroundColor:
            game && championshipColors[color] && championshipColors[color][0],
          color:
            game && championshipColors[color] && championshipColors[color][1],
        }}
      >
        <div
          className="card-body game-block"
          onClick={() => toggleModal(true, game)}
        >
          <h5 className="card-title">{`${game["play__team-1"]} - ${game["play__team-2"]}`}</h5>
          <p className="card-text">{game.play__time}</p>
        </div>
        <div className="card-footer">
          <small>{game.play__result}</small>
        </div>
      </div>
    </div>
  );
};

export default CardBody;
