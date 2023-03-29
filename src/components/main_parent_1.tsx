import "../css/main_parent_1.css";
import { useState, useEffect } from "react";

function Main_1() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

    const formattedDate = currentTime.toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="parent2">
      <div>
        <p className="time">&nbsp;</p>
      </div>
      <div className="child2">
        <div>
          <p className="date">{formattedDate}</p>
        </div>
        <div>
          <p className="time">{formattedTime}</p>
        </div>
        <div>
          <p className="office">OFFICE</p>
        </div>
      </div>
      <div className="button-div">
        <button className="button-leave"> Are you on leave? </button>
      </div>
    </div>
  );
}

 export default Main_1;

