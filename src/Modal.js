import React from "react";
import Loader from "./Loader";

const Modal = ({ isToggleModal, toggleModal, data, loading }) => {
  const { modalActiveGame: game } = data;

  return (
    <div
      className="modal fade show"
      style={{ display: isToggleModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
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
                  <div className="header-team__logo"></div>
                  <div className="header-team__name">
                    {game && game["play__team-1"]}
                  </div>
                </div>
                <div className="header-score">{game && game.play__result}</div>
                <div className="header-team">
                  <div className="header-team__name">
                    {game && game["play__team-2"]}
                  </div>
                  <div className="header-team__logo"></div>
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
              title="Сохранить в избранное"
            >
              Сохранить
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="tooltip"
              title="Отслеживать ход матча"
            >
              Следить
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-toggle="tooltip"
              title="Удалить матч из панели"
            >
              Удалить
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => toggleModal(false)}
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
