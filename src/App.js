import './App.css'
import Header from './components/header';
import Score from './components/score';
import Game from './components/game'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body">
        <Score /> 
        <Game />
      </div>
    </div>
  );
}

export default App;
