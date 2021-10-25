import React from "react";
import { useHistory } from "react-router-dom";
import CardBody from "./CardBody";
import Loader from "./Loader";

const Content = ({ data, loading, toggleModal }) => {
  const parsedDate = new Date(data.updateTime);
  const normalDate = `${parsedDate.getHours()}:${parsedDate.getMinutes()}`;
  const history = useHistory();

  const renderContentBody = (filterValue) => {
    let filteredGames = data.games ? [...data.games] : [];

    if (filterValue === "online") {
      filteredGames = filteredGames.filter(
        ({ play__time }) =>
          play__time.split("").filter((a) => a === "’").length > 0 ||
          play__time === "перерыв"
      );
    } else if (filterValue === "finished") {
      filteredGames = filteredGames.filter(
        ({ play__time }) => play__time === "FT"
      );
    }

    return (
      <div className="card-body">
        {data.updateTime && (
          <div
            className="lead"
            style={{ padding: "0px 0px 20px", textAlign: "left" }}
          >{`Последнее обновление: ${normalDate}`}</div>
        )}
        <div className="row row-cols-1 row-cols-md-2 g-4 ">
          {loading && !data.modalActiveGame ? (
            <Loader height="60vh" />
          ) : (
            filteredGames &&
            filteredGames.map((game, i) => {
              return <CardBody toggleModal={toggleModal} game={game} key={i}/>;
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="Content">
      {renderContentBody(history.location.pathname.split("/")[2])}{" "}
      {/* "/panel/all" =>> all */}
    </div>
  );
};

export default Content;
