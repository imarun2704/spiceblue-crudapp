import React from 'react';
import './App.css';
import Contact from './components/contacts';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
 
function App() {
  return (
    <div className="App">
      <Header />
      <Contact />
    </div>
  );
}

export default App;
