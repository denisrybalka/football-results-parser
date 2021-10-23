import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Modal from "./Modal";
import Favorites from "./Favorites";
import Saved from "./Saved";
import Deleted from "./Deleted";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router";

const url = "http://localhost:3001";

const App = () => {
  const [data, setData] = React.useState({
    activeTab: 0,
    activeBar: 0,
    modalActiveGame: null,
  });
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data"));
    const lastUpdate = JSON.parse(localStorage.getItem("lastUpdate"));
    if (localData && lastUpdate) {
      setData((state) => {
        return {
          ...state,
          games: localData,
          updateTime: lastUpdate,
        };
      });
    }
  }, []);

  const updateData = () => {
    setLoading(true);
    axios
      .get(`${url}/getData`)
      .then(({ data }) => {
        const lastUpdate = Date.now();
        localStorage.setItem(
          "data",
          JSON.stringify(
            data.map((el) => {
              return {
                ...el,
                additionalStatistic: null,
              };
            })
          )
        );
        localStorage.setItem("lastUpdate", JSON.stringify(lastUpdate));
        setData((state) => {
          return {
            ...state,
            games: data.map((el) => {
              return {
                ...el,
                additionalStatistic: null,
              };
            }),
            updateTime: lastUpdate,
          };
        });
      })
      .catch((error) => {
        console.error("ERROR FETCHING: ", error);
        alert("При получении данных произошла ошибка! Попробуйте снова!");
      })
      .finally(() => setLoading(false));
  };

  const handleActiveTab = (id) => {
    setData((state) => {
      return {
        ...state,
        activeTab: id,
      };
    });
  };

  const handleActiveBar = (id) => {
    setData((state) => {
      return {
        ...state,
        activeBar: id,
      };
    });
  };

  const toggleModal = (isToggleModal, game = null) => {
    setModal(isToggleModal);
    setData((state) => {
      return {
        ...state,
        modalActiveGame: game,
      };
    });

    game && fetchAdditionalStatistics(game);
  };

  const fetchAdditionalStatistics = (game) => {
    if (game.additionalStatistic === null) {
      setLoading(true);
      axios
        .get(`${url}/getGameStatistic/${game.statistic}`)
        .then(({ data }) => {
          setData((state) => {
            return {
              ...state,
              modalActiveGame: {
                ...state.modalActiveGame,
                additionalStatistic: data,
                play__result: data.score,
                play__time: data.time,
              },
              games: state.games.map((play) => {
                if (play.statistic === game.statistic) {
                  return {
                    ...play,
                    additionalStatistic: data,
                    play__result: data.score,
                    play__time: data.time,
                  };
                } else {
                  return play;
                }
              }),
            };
          });
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="App">
      <div className="card main-block">
        <div className="card-body main-block__inner">
          <Sidebar handleActiveBar={handleActiveBar} data={data} />
          <Switch>
            <Route path="/panel/:filter">
              <Navbar
                updateData={updateData}
                data={data}
                loading={loading}
                handleActiveTab={handleActiveTab}
                toggleModal={toggleModal}
              />
            </Route>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
            <Route exact path="/saved">
              <Saved />
            </Route>
            <Route exact path="/deleted">
              <Deleted />
            </Route>
          </Switch>
        </div>
      </div>
      <Modal
        isToggleModal={modal}
        toggleModal={toggleModal}
        data={data}
        loading={loading}
      />
    </div>
  );
};

export default App;
