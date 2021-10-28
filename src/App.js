import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Modal from "./Modal";
import Favorites from "./Favorites";
import Saved from "./Saved";
import Deleted from "./Deleted";
import Team from "./Team";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";

const url = "http://localhost:3001";

const App = () => {
  const [data, setData] = React.useState({
    activeTab: 0,
    activeBar: 0,
    modalActiveGame: null,
    saved: [],
    favorites: [],
    teamInfo: null,
    actualDate: new Date(Date.now()),
    deleted: [],
  });
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data"));
    const lastUpdate = JSON.parse(localStorage.getItem("lastUpdate"));
    const saved = JSON.parse(localStorage.getItem("saved") || "[]");
    const deleted = JSON.parse(localStorage.getItem("deleted") || "[]");

    if (localData && lastUpdate && saved) {
      setData((state) => {
        return {
          ...state,
          games: localData,
          updateTime: lastUpdate,
          actualDate: new Date(Date.now()),
          saved,
          deleted,
        };
      });
    }
  }, []);

  const updateData = () => {
    setLoading(true);
    const date = `${data.actualDate.getDate()}.${data.actualDate.getMonth()+1}.${data.actualDate.getFullYear()}`;
    axios
      .get(`${url}/getData/${date}`)
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

    if (!isToggleModal) {
      setLoading(false);
    }
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

  const addToSaved = (game) => {
    const idx = data.saved.findIndex((g) => g.statistic === game.statistic);

    if (idx === -1) {
      localStorage.setItem("saved", JSON.stringify([...data.saved, game]));
      setData((state) => {
        return {
          ...state,
          saved: [...state.saved, game],
        };
      });
      alert("Добавлено в сохраненные!");
    } else {
      alert("Уже в сохраненных!");
    }
  };
  
  const addToHidden = (game) => {
    const idx = data.deleted.findIndex((g) => g.statistic === game.statistic);

    if (idx === -1) {
      localStorage.setItem("deleted", JSON.stringify([...data.deleted, game]));
      setData((state) => {
        return {
          ...state,
          deleted: [...state.deleted, game],
        };
      });
      toggleModal(false);
    }
  }

  const getTeamInfo = (teamId) => {
    setLoading(true);
    axios
      .get(`${url}/getTeamData/${teamId}`)
      .then(({ data }) => {
        setData((state) => {
          return {
            ...state,
            teamInfo: data,
          };
        });
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const removeTeamInfo = () => {
    setData((state) => {
      return {
        ...state,
        teamInfo: null,
      };
    });
  };

  const changeActualDate = (value) => {
    const d = data.actualDate.setDate(data.actualDate.getDate() + value);
    setData((state) => {
      return {
        ...state,
        actualDate: new Date(d),
      };
    });
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
                changeActualDate={changeActualDate}
                addToHidden={addToHidden}
              />
            </Route>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
            <Route exact path="/saved">
              <Saved data={data} toggleModal={toggleModal}/>
            </Route>
            <Route exact path="/deleted">
              <Deleted data={data} toggleModal={toggleModal}/>
            </Route>
            <Route exact path="/team/:id">
              <Team
                getTeamInfo={getTeamInfo}
                teamInfo={data.teamInfo}
                loading={loading}
                removeTeamInfo={removeTeamInfo}
              />
            </Route>
          </Switch>
        </div>
      </div>
      <Modal
        isToggleModal={modal}
        toggleModal={toggleModal}
        data={data}
        loading={loading}
        addToSaved={addToSaved}
        addToHidden={addToHidden}
      />
    </div>
  );
};

export default App;
