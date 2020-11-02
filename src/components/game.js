import React, {useState, useEffect} from "react";

function Game() {
   const [pictureCards, setPictureCards] = useState([]);
   const [picIndex, setPicIndex] = useState([]);
   const [hiddenOrNot, setHiddenOrNot] = useState(true);

   useEffect(() => {
      fetch(`https://dog.ceo/api/breed/corgi/images/random/8`)
         .then(res => res.json())
         .then(json => setPictureCards(shuffle(duplicate(json.message))))
   }, [])

   function shuffle(arrayShuffled) {
      for (let x = arrayShuffled.length-1; x > 0; x--) {
         const y = Math.floor(Math.random() * x)
         const temp = arrayShuffled[x]
         arrayShuffled[x] = arrayShuffled[y]
         arrayShuffled[y] = temp
      }
      return arrayShuffled
   }

   function duplicate(arrayDup) {
      let secondArray = []
      for (let x=0; x<arrayDup.length; x++){
         secondArray.push(arrayDup[x]);
         secondArray.push(arrayDup[x]);
      }
      return secondArray
   }

   function reveal() {
      setHiddenOrNot(!hiddenOrNot);
   }

   return (
      <div className="game">
         {pictureCards.map((dog, index) => (
            <button onClick={reveal}>
               <img 
               className={hiddenOrNot ? "hidden" : "dogs"} 
               id={index} 
               type="image" 
               src={dog} 
               alt=""
               />
            </button>
         ))}
      </div>
   );
}

export default Game;
