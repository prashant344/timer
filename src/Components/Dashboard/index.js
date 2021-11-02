import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerState, setTimerState] = useState("Start");
  const [timerInterval, setTimerInterval] = useState();
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  useEffect(() => {
    const savedProjects = JSON.parse(
      JSON.stringify(localStorage.getItem("projects"))
    );
    if (savedProjects) {
      setProjects(savedProjects);
    }
  }, []);

  const handleProjectName = (e) => {
    setProjectName(e.target.value);
  };
  const handleTimer = () => {
    let interval;
    if (!timerState || timerState === "Stop") {
      setTimerState("Start");
    } else {
      setTimerState("Stop");
    }
    const totalValue = 0;
    if (timerState === "Stop") {
      clearInterval(timerInterval);
      setProjects([
        ...projects,
        {
          name: projectName || "",
          timeSpent: `${hours}:${minutes}:${seconds}`,
        },
      ]);
      const savedprojects = JSON.parse(
        JSON.stringify(localStorage.getItem("projects"))
      );
      if (!savedprojects || !savedprojects.length) {
        const saveValue = JSON.stringify([
          {
            name: projectName || "",
            timeSpent: `${hours}:${minutes}:${seconds}`,
          },
        ]);
        localStorage.setItem("projects", saveValue);
      } else {
        console.log("saved", savedprojects);
        const filteredProj =
          savedprojects &&
          savedprojects.length &&
          savedprojects.find((proj) => proj.name === projectName);
        const savedTimerVal = filteredProj.timeSpent;
        const splittedVal = savedTimerVal.split(":");
        const updatedHour = parseInt(splittedVal[0]) + hours;
        const updatedMinute = parseInt(splittedVal[1]) + minutes;
        const updatedSeconds = parseInt(splittedVal[2]) + seconds;
        const saveValue = localStorage.setItem("projects", saveValue);
      }
      setSeconds(0);
      setMinutes(0);
      setHours(0);
    } else {
      interval = setInterval(() => {
        if (seconds < 60) {
          setSeconds((prevSecond) => prevSecond + 1);
        }
        if (seconds === 60) {
          setSeconds(0);
          setMinutes((prevMinute) => prevMinute + 1);
        }
        if (minutes === 60) {
          setMinutes(0);
          setHours((prevHour) => prevHour + 1);
        }
      }, 1000);
    }
    setTimerInterval(interval);
  };
  return (
    <div>
      <input type="text" value={projectName} onChange={handleProjectName} />
      <button>Add Project</button>
      <div>{`${hours}:${minutes}:${seconds}`}</div>
      <button onClick={handleTimer}>{timerState} Timer</button>
    </div>
  );
};

export default Dashboard;
