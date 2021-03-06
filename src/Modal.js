import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { BiFootball } from "react-icons/bi";

const Modal = ({ isToggleModal, toggleModal, data, loading, addToSaved }) => {
  const { modalActiveGame: game } = data;

  const copyToClipboard = () => {
    let goals = game.additionalStatistic.goals["team-1"].concat(
      game.additionalStatistic.goals["team-2"]
    );

    goals.sort((a, b) => a.minute.slice(1) - b.minute.slice(1));

    goals = goals.map((el) => {
      let player = el.player.replace(/\s+/g, " ").trim();
      if (player.split(" ").filter((a) => a === "пенальти").length > 0) {
        player = player.split(" ").slice(0, -2).concat("(пен)").join(" ");
      }
      return {
        ...el,
        player,
      };
    });
    const info = `${goals
      .map((el) => `⚽️ ${el.player}, ${el.minute}\n`)
      .join("")}`;

    navigator.clipboard.writeText(info);
    alert("Скопировано в буфер обмена!");
  };

  return (
    <div
      className="modal fade show"
      style={{ display: isToggleModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg animate__animated animate__fadeInDownBig animate__faster">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title text-muted">
              {game && game.championship}
            </div>
            <button
              type="button"
              className="btn btn-close"
              onClick={() => toggleModal(false)}
            ></button>
          </div>
          {loading ? (
            <Loader height="15vh" />
          ) : (
            <div className="modal-body animate__animated animate__fadeIn">
              <div className="header-wrap">
                <div className="header-team">
                  <img
                    className="header-team__logo"
                    src={game && game.additionalStatistic.images[0]}
                    alt="team-logo1"
                  />
                  <Link
                    className="header-team__name"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Перейти на страницу команды"
                    to={`/team/${game && game.additionalStatistic.id[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {game && game["play__team-1"]}
                  </Link>
                </div>
                <div className="header-score">{game && game.play__result}</div>
                <div className="header-team">
                  <Link
                    className="header-team__name"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Перейти на страницу команды"
                    to={`/team/${game && game.additionalStatistic.id[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {game && game["play__team-2"]}
                  </Link>
                  <img
                    className="header-team__logo"
                    src={game && game.additionalStatistic.images[1]}
                    alt="team-logo2"
                  />
                </div>
              </div>
              <div className="goals-wrap">
                {new Array(2).fill(0).map((b, i) => {
                  return (
                    <div className="goals-block" key={i}>
                      {game &&
                        game.additionalStatistic.goals[`team-${i + 1}`].map(
                          (goal, j) => {
                            return (
                              <div className="goals-block__goal" key={j}>
                                {goal.player && <BiFootball />}
                                {` ${goal.player} ${goal.minute}`}
                              </div>
                            );
                          }
                        )}
                    </div>
                  );
                })}
              </div>
              <button
                className="btn btn-link btn-copy"
                onClick={copyToClipboard}
              >
                Копировать
              </button>
            </div>
          )}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              data-toggle="tooltip"
              title="Добавить в сохраненные"
              onClick={() => addToSaved(data.modalActiveGame)}
              disabled={loading}
            >
              Сохранить
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => toggleModal(false)}
              disabled={loading}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
