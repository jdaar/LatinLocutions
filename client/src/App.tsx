import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocutionsList from "./components/LocutionsList";
import { addLocution, favLocution, RootState } from "./redux/store";
import { ILocution } from "./redux/types";

function App() {
  const locutions = useSelector((state: RootState) => state.locutions);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(20);
  useEffect(() => {
    Axios.get(`http://localhost:8080?q=${quantity}`).then((res) => {
      for (let x of res.data.locutions) {
        let newLocution: ILocution = {
          locution: x.locution,
          meaning: x.meaning,
          fav: false,
        };
        dispatch(addLocution(newLocution));
      }
    });
  }, [quantity]);

  const addToQuantity = () => {
    setQuantity(quantity + 10);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Locuciones latinas</h1>
      </nav>
      <LocutionsList addToQuantity={addToQuantity}></LocutionsList>
      <button onClick={addToQuantity}>Load more</button>
      <footer id="open-wrapper">
        <div className="open_saved">
          <button id="open">
            <i className="fas fa-list"></i>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
