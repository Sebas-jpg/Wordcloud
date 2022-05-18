import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import GameScreen from "./components/pages/GameScreen";
import HomeScreen from './components/pages/HomeScreen';
import ScoreScreen from './components/pages/ScoreScreen';

function App() {

  const [savedName, setSavedName] = useState();
  const [savedScore, setSavedScore] = useState();

  return (
    <div className='wrapper'>
      <Routes>
        <Route exact path="/Game" element={<GameScreen setScore={setSavedScore} />} />
        <Route exact path="/Score" element={<ScoreScreen name={savedName} score={savedScore} />} />
        <Route exact path="/" element={<HomeScreen setName={setSavedName} />} />
      </Routes>
    </div>
  );
}

export default App;
