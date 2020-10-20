import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function () {
  const saved = useSelector((state: RootState) =>
    state.locutions.filter((v) => v.fav)
  );

  const download = (filename: string, text: string) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <div className="saved" id="saved">
      <div className="title">
        <h2>Guardadas</h2>
        <div className="buttons">
          <button
            className="download"
            onClick={(e) => {
              let data = saved
                .map((v) => `${v.locution}: ${v.meaning}`)
                .join("\n");
              download("locuciones", data);
            }}
          >
            <i className="fas fa-file-download"></i>
          </button>
          <button
            className="close"
            onClick={(e) => {
              document.getElementById("saved")!.style.top = "100%";
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      <ul className=" locutions full-w">
        {saved.map((v, i) => (
          <li className="container" key={i}>
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
