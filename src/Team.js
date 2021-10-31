import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Team = ({ getTeamInfo, teamInfo, loading, removeTeamInfo }) => {
  const history = useHistory();
  const teamId = history.location.pathname.split("/")[2];

  React.useEffect(() => {
    getTeamInfo(teamId);
  }, []);

  return (
    <div className="Team">
      {loading ? (
        <Loader />
      ) : (
        <div className="animate__animated animate__fadeIn animate__faster">
          <img
            src={teamInfo && teamInfo.logo}
            className="card-img-top"
            alt="team-logo"
          />
          <div className="card-body">
            <h5 className="card-title">{teamInfo && teamInfo.name}</h5>
            <p className="card-text">{teamInfo && teamInfo.country}</p>
            <Link
              className="btn btn-secondary"
              to="/panel/all"
              onClick={removeTeamInfo}
            >
              Вернуться на главную
            </Link>
          </div>
          <ul className="list-group list-group-flush">
            {teamInfo &&
              teamInfo.matches.map((match, i) => {
                return (
                  <li
                    className="list-group-item"
                    key={i}
                  >{`${match.play__time}: ${match["play__team-1"]} ${match.play__result} ${match["play__team-2"]}`}</li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Team;
