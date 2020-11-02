import React, {useState, useEffect} from "react";

function Score() {
   const [score, setScore] = useState(0);
   const [time, setTime] = useState(0);

   useEffect(() => {
      var timer = setInterval( () => tick(), 1000);

      return function cleanup() {
         clearInterval(timer)
      };
   }, [time]);

   function tick() {
      setTime(prevTime => prevTime + 1);
   }

   return (
      <div>
         <p className="score">Clicks: {score} </p>
         <button onClick={tick}>START</button>
         <p className="timer">Time: {time}</p>
      </div>
  );
}

export default Score;
