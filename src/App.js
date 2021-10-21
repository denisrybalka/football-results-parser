import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const url = "http://localhost:3001";

const App = () => {
  const [data, setData] = React.useState({activeTab: 0});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data"));
    const lastUpdate = JSON.parse(localStorage.getItem("lastUpdate"));
    if (localData && lastUpdate) {
      setData((state) => {
        return {
          ...state,
          games: localData,
          updateTime: lastUpdate,
        }
      });
      
    }
  }, [])

  const updateData = () => {
    setLoading(true);
    axios
      .get(`${url}/getData`)
      .then(({ data }) => {
        const lastUpdate = Date.now();
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("lastUpdate", JSON.stringify(lastUpdate));
        setData((state) => {
          return {
            ...state,
            games: data,
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
      }
    })
  }

  return (
    <div className="App">
      <div className="card main-block">
        <div className="card-body main-block__inner">
          <Sidebar />
          <Navbar updateData={updateData} data={data} loading={loading} handleActiveTab={handleActiveTab}/>
        </div>
      </div>
    </div>
  );
};

export default App;
