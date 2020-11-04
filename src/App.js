import './App.css'
import Header from './components/header';
import Game from './components/game'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body">
        <Game />
      </div>
    </div>
  );
}

export default App;
