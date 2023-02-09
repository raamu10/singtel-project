import React from 'react';
import Header from './components/header';
import Home from './components/home';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        SingTel Project
      </header> */}
      <Header />
      <Home />
    </div>
  );
}

export default App;
