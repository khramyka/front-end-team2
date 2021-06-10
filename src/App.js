import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from './components';
import "./style/main.css"

const  App = () => {
  return (
      <BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
