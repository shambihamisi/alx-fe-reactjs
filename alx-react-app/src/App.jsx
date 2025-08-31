import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div>
      <h1>User Profiles</h1>
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <UserProfile name="Bob" age="30" bio="Avid traveler and foodie" />
      <UserProfile name="Charlie" age="28" bio="Enjoys coding and gaming" />
    </div>
  );
}

export default App;
