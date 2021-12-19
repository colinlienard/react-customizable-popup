import React from 'react';
import Popup from 'react-customizable-popup';
import './App.css';

const App = () => (
  <div className="App">
    <Popup
      toggler={
        <button type="button">Open</button>
      }
    >
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, tempora?</p>
    </Popup>
  </div>
);

export default App;
