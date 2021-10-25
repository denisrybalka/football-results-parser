import React from "react";
import Loader from "./Loader";

const Modal = ({ isToggleModal, toggleModal, data, loading, addToSaved }) => {
  const { modalActiveGame: game } = data;

  return (
    <div
      className="modal fade show"
      style={{ display: isToggleModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title text-muted">{game && game.championship}</div>
            <button
              type="button"
              className="btn btn-close"
              onClick={() => toggleModal(false)}
            ></button>
          </div>
          {loading ? (
            <Loader height="15vh" />
          ) : (
            <div className="modal-body">
              <div className="header-wrap">
                <div className="header-team">
                  <img className="header-team__logo" src={game && game.additionalStatistic.images[0]} alt="team-logo1"/>
                  <div className="header-team__name">
                    {game && game["play__team-1"]}
                  </div>
                </div>
                <div className="header-score">{game && game.play__result}</div>
                <div className="header-team">
                  <div className="header-team__name">
                    {game && game["play__team-2"]}
                  </div>
                  <img className="header-team__logo" src={game &&game.additionalStatistic.images[1]} alt="team-logo2"/>
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
                              <div
                                className="goals-block__goal"
                                key={j}
                              >{`${goal.player} ${goal.minute}`}</div>
                            );
                          }
                        )}
                    </div>
                  );
                })}
              </div>
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
              className="btn btn-danger"
              data-toggle="tooltip"
              title="Удалить матч из панели"
              disabled={loading}
            >
              Удалить
            </button>
            <button
              type="button"
              className="btn btn-secondary"
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
