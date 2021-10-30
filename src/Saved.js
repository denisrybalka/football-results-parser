import React from "react";
import CardBody from "./CardBody";

const Saved = ({
  data,
  toggleModal,
  addToHidden,
  addToSaved,
  removeFromSaved,
  removeFromHidden,
}) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 g-3 Saved">
      {data.saved &&
        data.saved.map((game, i) => {
          return (
            <CardBody
              toggleModal={toggleModal}
              game={game}
              addToHidden={addToHidden}
              addToSaved={addToSaved}
              removeFromSaved={removeFromSaved}
              removeFromHidden={removeFromHidden}
              hidden={data.hidden}
              saved={data.saved}
              key={i}
            />
          );
        })}
    </div>
  );
};

export default Saved;
