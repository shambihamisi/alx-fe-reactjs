import { useState } from 'react'
import './App.css'
import React from "react";
import UserProfile from "./components/UserProfile";
import Header from "./components/Header";
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <h1>User Profiles</h1>
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <UserProfile name="Bob" age="30" bio="Avid traveler and foodie" />
      <UserProfile name="Charlie" age="28" bio="Enjoys coding and gaming" />
       <Footer />
    </div>
  );
}

export default App;