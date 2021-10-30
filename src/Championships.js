import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Championships = ({ championship, selectActiveChampionship, loading }) => {
  const championships = [
    { value: "england", league: "English Premier League" },
    { value: "germany", league: "Bundesliga" },
    { value: "spain", league: "LaLiga" },
    { value: "italy", league: "Serie A" },
    { value: "france", league: "Ligue 1" },
    { value: "ukraine", league: "Українська Прем'єр-ліга" },
    { value: "portugal", league: "Liga Portugal" },
  ];

  return (
    <div className="Championship">
      <select
        className="select"
        onChange={(e) => selectActiveChampionship(e.target.value)}
        defaultValue="1"
      >
        <option disabled value="1">Выберите чемпионат</option>
        {championships.map(({ value, league }, i) => {
          return (
            <option value={value} key={i}>
              {league}
            </option>
          );
        })}
      </select>
      {loading ? (
        <Loader />
      ) : (
        championship && <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Команда</th>
              <th scope="col">И</th>
              <th scope="col">В</th>
              <th scope="col">Н</th>
              <th scope="col">П</th>
              <th scope="col">Разница мячей</th>
              <th scope="col">Очки</th>
            </tr>
          </thead>
          <tbody>
            {championship &&
              championship.map((ch, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{ch.place}</th>
                    <td>
                      <Link to={`/team/${ch.name.id}`}>{ch.name.name}</Link>
                    </td>
                    <td>{ch.games}</td>
                    <td>{ch.wins}</td>
                    <td>{ch.draws}</td>
                    <td>{ch.defeats}</td>
                    <td>{ch["goals-difference"]}</td>
                    <td>{ch.points}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Championships;
