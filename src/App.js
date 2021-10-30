import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Modal from "./Modal";
import Championships from "./Championships";
import Saved from "./Saved";
import Hidden from "./Hidden";
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
    hidden: [],
  });
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [championship, setChampionship] = React.useState(null);

  React.useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data"));
    const lastUpdate = JSON.parse(localStorage.getItem("lastUpdate"));
    const saved = JSON.parse(localStorage.getItem("saved") || "[]");
    const hidden = JSON.parse(localStorage.getItem("hidden") || "[]");

    if (localData && lastUpdate && saved) {
      setData((state) => {
        return {
          ...state,
          games: localData,
          updateTime: lastUpdate,
          actualDate: new Date(Date.now()),
          saved,
          hidden,
        };
      });
    }
  }, []);

  const updateData = () => {
    setLoading(true);
    const date = `${data.actualDate.getDate()}.${
      data.actualDate.getMonth() + 1
    }.${data.actualDate.getFullYear()}`;
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
    }
  };

  const removeFromSaved = (game) => {
    const idx = data.saved.findIndex((g) => g.statistic === game.statistic);

    if (idx !== -1) {
      const filteredSaved = data.saved.filter(
        (g) => g.statistic !== game.statistic
      );

      localStorage.setItem("saved", JSON.stringify(filteredSaved));
      setData((state) => {
        return {
          ...state,
          saved: filteredSaved,
        };
      });
    }
  };

  const addToHidden = (game) => {
    const idx = data.hidden.findIndex((g) => g.statistic === game.statistic);

    if (idx === -1) {
      localStorage.setItem("hidden", JSON.stringify([...data.hidden, game]));
      setData((state) => {
        return {
          ...state,
          hidden: [...state.hidden, game],
        };
      });
      toggleModal(false);
    }
  };

  const removeFromHidden = (game) => {
    const idx = data.hidden.findIndex((g) => g.statistic === game.statistic);

    if (idx !== -1) {
      const filteredHidden = data.hidden.filter(
        (g) => g.statistic !== game.statistic
      );

      localStorage.setItem("hidden", JSON.stringify(filteredHidden));
      setData((state) => {
        return {
          ...state,
          hidden: filteredHidden,
        };
      });
    }
  };

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

  const selectActiveChampionship = (country) => {
    setLoading(true);
    axios.get(`${url}/getChampionship/${country}`).then(({data}) => {
      console.log(data);
      setChampionship(data);
    }).finally(() => setLoading(false));
  }

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
                addToSaved={addToSaved}
                removeFromSaved={removeFromSaved}
                removeFromHidden={removeFromHidden}
              />
            </Route>
            <Route exact path="/championships">
              <Championships championship={championship} selectActiveChampionship={selectActiveChampionship} loading={loading}/>
            </Route>
            <Route exact path="/saved">
              <Saved
                data={data}
                loading={loading}
                toggleModal={toggleModal}
                addToHidden={addToHidden}
                addToSaved={addToSaved}
                removeFromSaved={removeFromSaved}
                removeFromHidden={removeFromHidden}
              />
            </Route>
            <Route exact path="/hidden">
              <Hidden
                data={data}
                loading={loading}
                toggleModal={toggleModal}
                addToHidden={addToHidden}
                addToSaved={addToSaved}
                removeFromSaved={removeFromSaved}
                removeFromHidden={removeFromHidden}
              />
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
