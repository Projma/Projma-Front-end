import logo from './logo.svg';
import './App.css';
import './fonts/Vazir.ttf';

function App() { // functional base component
  return (
    <div className="App"> 
    {/* className instead of class in JSX */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <>
          <h1>سلام</h1>
        </>
      </header>
    </div>
  );
}

export default App;
