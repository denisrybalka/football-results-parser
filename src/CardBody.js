import React from "react";
import { BsEyeSlash, BsEye, BsInfoSquare } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const CardBody = ({
  toggleModal,
  game,
  addToHidden,
  saved,
  hidden,
  addToSaved,
  removeFromSaved,
  removeFromHidden,
}) => {
  const championship = game.championship;
  let splittedColor = championship.split(",");
  let color =
    splittedColor.length > 2
      ? splittedColor.slice(0, -1).join(",")
      : splittedColor.join(",");

  const championshipColors = {
    "Чемпионат Англии, Премьер-лига": ["purple", "white"],
    "Чемпионат Германии, Бундеслига": ["red", "white"],
    "Чемпионат Испании, Примера": ["#fbec21", "black"],
    "Чемпионат Италии, Серия А": ["#008fd7", "white"],
    "Чемпионат Франции, Лига 1": ["#dae025", "#12233f"],
    "Чемпионат Украины, Премьер-лига": ["white", "skyblue"],
    "Лига Чемпионов 2021/2022": ["#030961", "white"],
    "Лига Европы 2021/2022": ["orange", "black"],
    "Лига конференций 2021/2022": ["lime", "black"],
  };

  const isSaved =
    saved && saved.findIndex((a) => game.statistic === a.statistic) !== -1;

  const isHidden =
    hidden && hidden.findIndex((a) => game.statistic === a.statistic) !== -1;

  return (
    <div className="col">
      <div
        className="card h-100"
        style={{
          backgroundColor:
            game && championshipColors[color] && championshipColors[color][0],
          color:
            game && championshipColors[color] && championshipColors[color][1],
          border: isSaved && "1px ridge rgba(170, 50, 220, .6)",
        }}
      >
        <div
          className="card-body game-block"
          onClick={() => toggleModal(true, game)}
        >
          <div className="card-title">
            <h5 className="card-title__text">{`${game["play__team-1"]} - ${game["play__team-2"]}`}</h5>
          </div>
          <p className="card-text">{game.play__time}</p>
        </div>
        <div className="card-footer">
          <BsInfoSquare
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={game && game.championship}
          />
          <small>{game.play__result}</small>
          <div>
            {!isHidden ? (
              <BsEyeSlash
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Скрыть матч из панели"
                className="hide-btn"
                onClick={() => addToHidden(game)}
              />
            ) : (
              <BsEye
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Убрать из скрытых"
                className="hide-btn"
                onClick={() => removeFromHidden(game)}
              />
            )}
            {isSaved ? (
              <AiFillStar
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Убрать из сохраненных"
                className="save-btn"
                onClick={() => removeFromSaved(game)}
              />
            ) : (
              <AiOutlineStar
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Добавить в сохраненные"
                className="save-btn"
                onClick={() => addToSaved(game)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBody;
