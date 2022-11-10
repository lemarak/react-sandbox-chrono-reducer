import { useEffect, useReducer, useState } from "react";
import "./Chrono.css";
import PauseImg from "../Images/pause.svg";
import PlayImg from "../Images/play.svg";
import ResetImg from "../Images/reset.svg";

const Chrono = () => {
  const [sessionTime, setSessionTime] = useState(1500);
  const [sessionTimeFixed, setSessionTimeFixed] = useState(1500);

  const [breakTime, setBreakTime] = useState(300);
  const [breakTimeFixed, setBreakTimeFixed] = useState(300);

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
      }, 1000);
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

  const handleSession = (e) => {
    const el = e.target;
    if (el.classList.contains("plus")) {
      setSessionTimeFixed(sessionTimeFixed + 60);
      setSessionTime(sessionTime + 60);
    } else if (sessionTimeFixed / 60 > 1) {
      setSessionTimeFixed(sessionTimeFixed - 60);
      setSessionTime(sessionTime - 60);
    }
  };

  const handleBreak = (e) => {
    const el = e.target;
    if (el.classList.contains("plus")) {
      setBreakTimeFixed(breakTimeFixed + 60);
      setBreakTime(breakTime + 60);
    } else if (breakTimeFixed >= 120) {
      setBreakTimeFixed(breakTimeFixed - 60);
      setBreakTime(breakTime - 60);
    }
  };

  return (
    <div
      className={
        workingChrono ? "container-chrono anim-glow" : "container-chrono"
      }
    >
      <div className="container-config">
        <div className="box-btns session">
          <button onClick={handleSession} className="minus">
            -
          </button>
          <span>{sessionTimeFixed / 60}</span>
          <button onClick={handleSession} className="plus">
            +
          </button>
        </div>
        <div className="box-btns break">
          <button onClick={handleBreak} className="minus">
            -
          </button>
          <span style={{ color: "green" }}>{breakTimeFixed / 60}</span>
          <button onClick={handleBreak} className="plus">
            +
          </button>
        </div>
      </div>
      <h1>
        {sessionTime >= 0 ? (
          <span>{`${Math.trunc(sessionTime / 60)} : ${
            sessionTime % 60 < 10 ? "0" + (sessionTime % 60) : sessionTime % 60
          }`}</span>
        ) : (
          <span style={{ backgroundColor: "green" }}>{`${Math.trunc(
            breakTime / 60
          )} : ${
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
