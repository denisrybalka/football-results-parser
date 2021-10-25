import React from "react";

const Saved = ({ data }) => {
  return (
    <div>
      {data.saved &&
        data.saved.map((game) => {
          return (
            <div>
              {`${game["play__team-1"]} ${game.play__result} ${game["play__team-2"]}`}
            </div>
          );
        })}
    </div>
  );
};

export default Saved;
