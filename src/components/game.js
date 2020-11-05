import React, {useState, useEffect} from "react";
import Score from './score';

function Game() {
   const [pictureCards, setPictureCards] = useState([]);
   const [clickCounter, setClickCounter] = useState(0);
   const [clickScore, setClickScore] = useState(0);
   const [clickArray, setClickArray] = useState([]);
   const [numberOfMatches, setNumberOfMatches] = useState(0);
   const [buttonBroken, setButtonBroken] = useState(false);

   useEffect(() => {
      getDogImages();
   }, [])

   useEffect(() => {
      ifMatch();
      if (clickCounter >= 2) {
         setClickCounter(0);
         setClickArray([]);
      }
   }, [clickCounter, numberOfMatches, buttonBroken])

   function getDogImages() {
      fetch(`https://dog.ceo/api/breed/corgi/images/random/8`)
         .then(res => res.json())
         .then(json => setPictureCards(shuffle(duplicate(json.message))))
   }

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
      getItemClicked(element);
      setClickCounter(prevClicks => prevClicks + 1);
      setClickScore(prevScore => prevScore + 1);
   };
   
   function getItemClicked(clickedOn) {
      let image = clickedOn[0];
      setClickArray(prevArray => [...prevArray, image]);
   }

   function ifMatch() {
      if (clickArray.length === 2)  {
         if (clickArray[0] !== clickArray[1] && clickArray[0].src === clickArray[1].src ) {
            clickArray[0].classList.add('show');
            clickArray[1].classList.add('show');
            setNumberOfMatches(prevNum => prevNum + 1);
            if (numberOfMatches === 7) {
               setNumberOfMatches(0);
               alert(`You Won! With ${clickScore} clicks. Press the 'Play Again' button to play again.`);
            }
         } else {
         setButtonBroken(true);
         setTimeout(function(){
            clickArray[0].classList.add('hidden');
            clickArray[1].classList.add('hidden');
            setButtonBroken(false);
         }, 1000);
      }}
   }

   function resetGame() {
      let images = document.getElementsByTagName('img')
      console.log(images)
      for (let x=0; x<images.length; x++) {
         images[x].classList.remove('show')
         images[x].classList.add('hidden')
      }
      setClickScore(0);
      getDogImages();
   }

   return (
      <div>
         <Score score={clickScore} reset={resetGame}/> 
         <div className="game">
            {pictureCards.map((dog, index) => (
               <button onClick={() => reveal(index)} key={index} disabled={buttonBroken}>
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
      </div>
   );
}

export default Game;
