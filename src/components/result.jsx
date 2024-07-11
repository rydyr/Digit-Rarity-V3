import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import './result.css';
import population from '../dataobjects/population.js';
import wordifyNum from '../dataobjects/switch.js';

const Result = ({ type, isTrue, length, charLen, score, gscore, types, tPop, placeholder }) => {
  const len = wordifyNum(length);
  const pop = population[type][len];
  const lab = population[type]["label"];
  const desc = population[type]["description"];
  const style = {
    display: isTrue || placeholder ? 'block' : 'none',
    cursor: isTrue ? 'pointer' : 'not-allowed',
    opacity: isTrue ? 1 : 0.5
  };
  const [isActive, setActive] = useState(false);
  const handleClick = () => {
    if (isTrue) setActive(!isActive);
  };
  const style2 = {
    display: isActive ? 'block' : 'none'
  };
  const style3 = {
    display: type === "scorecard" ? 'block' : 'none'
  };

  return ReactDOM.createPortal(
    <div className="result" style={style} onClick={handleClick}>
        <h3 className="resultTitle">{lab} &nbsp; &nbsp; {charLen} {score}</h3>
        <div className="popBlock" style={style2}>
          <p className="popLab">Population: &nbsp; {pop} {tPop}</p>
          <p className="gScore" style={style3}><span className="bright">Type Score:</span><br />{gscore}</p>
          <p className="typesList" style={style3}><span className="bright">Type: </span>{types}</p>
          <p className="popDes"><span className="bright">Description</span><br />&nbsp; &nbsp; {desc}</p>
      </div>
    </div>, document.getElementById("result-portal")
  );
};

export default Result;
