import React, { useEffect } from 'react';
import './App.css';
import HomePage from './HomePage';

function App() {
  useEffect(() => {
    document.title = "ChessMastermind";
  }, []);

  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
