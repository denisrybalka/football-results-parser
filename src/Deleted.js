import React from 'react'
import CardBody from './CardBody';

const Deleted = ({toggleModal, data}) => {
    return (
        <div className="row row-cols-1 row-cols-md-2 g-3 Saved">
          {data.saved &&
            data.deleted.map((game, i) => {
              return <CardBody toggleModal={toggleModal} game={game} key={i}/>
            })}
        </div>
      );
}

export default Deleted