import { useEffect, useReducer, useState } from "react";
import "./Chrono.css";
import PauseImg from "../Images/pause.svg";
import PlayImg from "../Images/play.svg";
import ResetImg from "../Images/reset.svg";

const Chrono = () => {
  const [sessionTime, setSessionTime] = useState(60);
  const [sessionTimeFixed, setSessionTimeFixed] = useState(60);

  const [breakTime, setBreakTime] = useState(60);
  const [breakTimeFixed, setBreakTimeFixed] = useState(60);

  const [workingChrono, setWorkingChrono] = useState(false);

  const reducer = (state, action) => {
    switch (action.type) {
      case "TICK":
        if (sessionTime >= 0) {
          setSessionTime(sessionTime - 1);
        } else if (breakTime >= 1) {
          setBreakTime(breakTime - 1);
        } else if (sessionTime <= 0 && breakTime <= 0) {
          setSessionTime(sessionTimeFixed);
          setBreakTime(breakTimeFixed);
        }
    }
  };

  const [state, dispatch] = useReducer(reducer);

  useEffect(() => {
    let id;
    if (workingChrono) {
      id = window.setInterval(() => {
        dispatch({ type: "TICK" });
      }, 100);
    }

    return () => {
      window.clearInterval(id);
    };
  }, [workingChrono]);

  const togglePause = () => {
    setWorkingChrono(!workingChrono);
  };

  const resetChrono = () => {
    setWorkingChrono(false);
    setSessionTime(sessionTimeFixed);
    setBreakTime(breakTimeFixed);
  };

  return (
    <div className="container-chrono">
      <div className="container-config">
        <div className="box-btns session">
          <button className="minus">-</button>
          <span>{sessionTimeFixed / 60}</span>
          <button className="plus">+</button>
        </div>
        <div className="box-btns break">
          <button className="minus">-</button>
          <span>{breakTimeFixed / 60}</span>
          <button className="plus">+</button>
        </div>
      </div>
      <h1>
        {sessionTime >= 0 ? (
          <span>{`${Math.trunc(sessionTime / 60)} : ${
            sessionTime % 60 < 10 ? "0" + (sessionTime % 60) : sessionTime % 60
          }`}</span>
        ) : (
          <span>{`${Math.trunc(breakTime / 60)} : ${
            breakTime % 60 < 10 ? "0" + (breakTime % 60) : breakTime % 60
          }`}</span>
        )}
      </h1>
      <div className="container-controllers">
        <button onClick={togglePause}>
          <img src={workingChrono ? PauseImg : PlayImg} alt="play" />
        </button>
        <button onClick={resetChrono}>
          <img src={ResetImg} alt="reset" />
        </button>
      </div>
    </div>
  );
};

export default Chrono;
