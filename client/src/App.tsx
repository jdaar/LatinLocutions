import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LocutionsList from "./components/LocutionsList";
import SavedList from "./components/SavedList";
import { addLocution } from "./redux/store";
import { ILocution } from "./redux/types";

function App() {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(20);
  useEffect(() => {
    Axios.get(`http://192.168.0.10:8080?q=${quantity}`).then((res) => {
      for (let x of res.data.locutions) {
        let newLocution: ILocution = {
          locution: x.locution,
          meaning: x.meaning,
          fav: false,
        };
        dispatch(addLocution(newLocution));
      }
    });
  }, [quantity, dispatch]);

  const addToQuantity = () => {
    setQuantity(quantity + 10);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Locuciones latinas</h1>
      </nav>
      <LocutionsList addToQuantity={addToQuantity}></LocutionsList>
      <footer id="open-wrapper">
        <div className="open_saved">
          <button
            id="open"
            onClick={(e) => (document.getElementById("saved")!.style.top = "0")}
          >
            <i className="fas fa-list"></i>
          </button>
        </div>
      </footer>
      <SavedList></SavedList>
    </div>
  );
}

export default App;
