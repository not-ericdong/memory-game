import React, {useState, useEffect} from "react";

function Score(props) {
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

   //-starts timer
   function resetTime() {
      setTime(0);
   }

   return (
      <div>
         <p className="score">Clicks: {props.score} </p>
         <button onClick={() => {props.reset(); resetTime();}}>Play Again</button>
         <p className="timer">Time: {time}</p>
      </div>
  );
}

export default Score;
