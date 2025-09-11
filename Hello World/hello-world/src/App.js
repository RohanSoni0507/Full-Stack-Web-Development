import logo from './logo.svg';
import React from 'react';
import './App.css';

import Greeting from './Greeting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World! 🌍</h1>
        <Greeting />
        <div style={{ fontSize: "5rem" }}>✨🔥💻</div>
      </header>
    </div>
  );
}


export default App;
