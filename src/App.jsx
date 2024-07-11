import * as DRM from './DRIndex.js';
import React, { useState, useEffect } from "react";
import Input from "./components/input.jsx";
import MyButton from "./components/button.jsx";
import Result from "./components/result.jsx";
import Menu from "./components/menu.jsx";
import Owner from './components/owner.jsx';
import FeaturedNames from './components/featured.jsx';
import score from "./dataobjects/score.js";
import wordifyNum from "./dataobjects/switch.js";
import findEnsOwner from './drmodules/owner.js';
import "./components/input.css";
import "./components/button.css";
import "./components/result.css";
import "./components/featured.css"
import "./App.css";

export default function App() {
  const rotArr = [0, 1, 6, 8, 9];
  const perArr = [0, 6, 8, 9];
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState("");
  const [owner, setOwner] = useState(null);
  const [finalScore, setFinalScore] = useState(0);
  const [typeScore, setTypeScore] = useState(0);
  const [typeList, setTypeList] = useState("");
  const [typePop, setTypePop] = useState("");
  const [result, setResult] = useState({
    length: 0,
    palindrome: false,
    ambigram: false,
    strobogrammatic: false,
    perfectprint: false,
    fourtwenty: false,
    sixtynine: false,
    prime: false,
    sequentialAsc: false,
    sequentialDsc: false,
    leadingzeros: false,
    trailingzeros: false
  });

  const handleChange = (newInput) => {
    if (/^\d*$/.test(newInput)) {
      setInput(newInput);
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter' && input.length >= 3 && input.length <= 8) {
      calcAll();
    }
  };

  const calculateScore = (result) => {
    let objCall = "";
    let types = "";
    let pop;
    let gpop;
    let length = wordifyNum(result.length);
    if (length) {
      for (const key in result) {
        if (result[key] && key !== "length") {
          objCall += key;
          types += `#${key} `;
        }
      }
      if (objCall) {
        pop = parseInt(score[objCall][length]);
        gpop = parseInt(score[objCall]["general"]);
      } else {
        pop = parseInt(score["floor"][length]);
        gpop = pop;
      }
      const setTotal = 111111000;
      const logScore1 = Math.log(setTotal / pop) / Math.log(10);
      const logScore2 = Math.log(setTotal / gpop) / Math.log(10);
      const finalScore = logScore1.toFixed(2);
      const gFinalScore = logScore2.toFixed(2);
      const strP = gpop.toLocaleString();
      const strPop = `${strP} / 111,111,000`;
      if (!types) {
        types = "Floor";
      }

      setFinalScore(finalScore);
      setTypeList(types);
      setTypeScore(gFinalScore);
      setTypePop(strPop);
    }
  };

  const calculateResults = async () => {
    const num = Number(input);
    setResult({
      length: input.length,
      palindrome: DRM.Palindrome(input),
      ambigram: DRM.RotationChecker(input, rotArr, DRM.AmbHelper),
      strobogrammatic: DRM.RotationChecker(input, rotArr, DRM.StrHelper),
      perfectprint: DRM.RotationChecker(input, perArr, DRM.PerHelper),
      prime: DRM.IsPrime(num),
      fourtwenty: DRM.Has420(input),
      sixtynine: DRM.Has69(input),
      sequentialAsc: DRM.Sequential(input, "asc"),
      sequentialDsc: DRM.Sequential(input, "dsc"),
      leadingzeros: DRM.LeadingZeros(input),
      trailingzeros: DRM.TrailingZeros(input)
    });
  };

  useEffect(() => {
    calculateScore(result);
  }, [result]);

  async function calcAll() {
    setIsActive(true);
    setOwner("loading...");
    calculateResults();
    await findEnsOwner(input).then(owner => {
      setOwner(owner);
    });
  }

  useEffect(() => {
    console.log(owner);
  }, [owner]);

  const featuredNames = ['66099','123','2234','3112','2121','6543','88088','2020','111','106901']

  return (
    <main>
      <Menu />
      <FeaturedNames names={featuredNames} />
      <div className='main-body'>
        <h1>Digit Rarity</h1>
        <div className="subTitle">
          <p>Digit Rarity is the fastest, easiest way to identify and compare numerical domain names</p>
          <p>Enter a number between 3 and 8 characters in length then click the results to find out more!</p>
        </div>
        <div className='active-area' onKeyDown={handleEnterPress}>
          <div className='input-container'>
            <Input className="input-box" value={input} onChange={handleChange} />
            <MyButton className="myButton" onCalculate={calcAll} isValid={/^\d+$/.test(input) && input.length >= 3 && input.length <= 8} />
          </div>
          <div className='owner-spot'>
            <Owner owner={owner} active={isActive} name={input} />
          </div>
        </div>
        <div className="results-container">
          <Result type="scorecard" isTrue={finalScore} score={finalScore} gscore={typeScore} types={typeList} tPop={typePop} placeholder={true} />
          {Object.keys(result).map((key) => (
            key !== "length" && <Result key={key} type={key} isTrue={result[key]} length={result.length} placeholder={true} />
          ))}
        </div>
      </div>
    </main>
  );
}




