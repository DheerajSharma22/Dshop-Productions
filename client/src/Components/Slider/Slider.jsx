// import { Cursor } from "mongoose";
import React from "react";
import "./Slider.css";

const Slider = ({ range, setRange, min, max }) => {
  const rangeHandler = (e) => {
    setRange(e.target.value);
  }
  return (
    <>
      <div className="sliderBox">
        <div className="min-max">
          <span>{min}</span>
          <span>{max}</span>
        </div>
        <div className="slidecontainer">
          <input
            type="range"
            min={min}
            max={max}
            value={range}
            className="slider"
            id="myRange"
            onInput={rangeHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
