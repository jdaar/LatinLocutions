import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function () {
  const saved = useSelector((state: RootState) =>
    state.locutions.filter((v) => v.fav)
  );

  return (
    <div className="saved" id="saved">
      <div className="title">
        <h2>Guardadas</h2>
        <button
          className="close"
          onClick={(e) =>
            (document.getElementById("saved")!.style.top = "100%")
          }
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <ul className=" locutions full-w">
        {saved.map((v) => (
          <li className="container">
            <div className="text">
              <h4>{v.locution}</h4>
              <p>{v.meaning}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
