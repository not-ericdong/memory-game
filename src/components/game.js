import React, {useState, useEffect} from "react";

function Game() {
   const [pictureCards, setPictureCards] = useState([]);
   const [clickCounter, setClickCounter] = useState(0);
   const [clickArray, setClickArray] = useState([]);

   useEffect(() => {
      fetch(`https://dog.ceo/api/breed/corgi/images/random/8`)
         .then(res => res.json())
         .then(json => setPictureCards(shuffle(duplicate(json.message))))
   }, [])

   useEffect(() => {
      ifMatch();
      if (clickCounter >= 2) {
         setClickCounter(0);
         setClickArray([]);
      }
   }, [clickCounter])

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
      let element = document.getElementsByClassName('index'+String(index));
      element[0].classList.remove('hidden');
      
      getItemClicked(element)

      setClickCounter(prevClicks => prevClicks + 1)
   };
   
   function getItemClicked(clickedOn) {
      let image = clickedOn[0]
      setClickArray(prevArray => [...prevArray, image])
   }

   function ifMatch() {
      if (clickArray.length === 2)  {
         if (clickArray[0].src === clickArray[1].src ) {
            clickArray[0].classList.add('show');
            clickArray[1].classList.add('show');
            // clickedOn[0].classList.toggle('show');
         } else {
         setTimeout(function(){
            clickArray[0].classList.add('hidden');
            clickArray[1].classList.add('hidden');
         }, 1000);
      }}
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
