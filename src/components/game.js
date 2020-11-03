import React, {useState, useEffect} from "react";

function Game() {
   const [pictureCards, setPictureCards] = useState([]);
   const [clickCounter, setClickCounter] = useState(0);

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

   function reveal(index) {
      let element = document.getElementsByClassName('index'+String(index))
      element[0].classList.toggle('hidden')
   };
   

   //function to get id and src of img
   //if two clicks match -> keeps them open 
   function doubleClick(id, img) {
      
   }

   return (
      <div className="game">
         {pictureCards.map((dog, index) => (
            <button onClick={() => reveal(index)}>
               <img
               className={'hidden index'+String(index)} 
               id="dogs" 
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
