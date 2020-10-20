import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favLocution, RootState } from "../redux/store";

export default function ({ addToQuantity }: { addToQuantity: () => void }) {
  const locutions = useSelector((state: RootState) => state.locutions);
  const dispatch = useDispatch();

  const fav = useCallback(
    (locution) => {
      dispatch(favLocution(locution));
    },
    [dispatch]
  );

  const scrollHandler = () => {
    let element: HTMLElement = document.getElementById("locutions")!;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      addToQuantity();
    }
  };

  return (
    <div
      className="locutions"
      id="locutions"
      onScroll={(e) => {
        scrollHandler();
      }}
    >
      <ul>
        {locutions.map((v, i) => (
          <li className="container" key={i}>
            <div className="text">
              <h4>{v.locution}</h4>
              <p>{v.meaning}</p>
            </div>
            <div className="heart">
              <button
                className={v.fav ? "checked" : ""}
                onClick={(e) => fav(v.locution)}
              >
                <i className="fas fa-heart"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="loader">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
