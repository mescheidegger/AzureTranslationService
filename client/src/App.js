//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Masthead from './Masthead';
import Translate from './Translate';
import Detect from './Detect';
import TranslateBatch from './TranslateBatch';

function App() {
  return (
    <Router>
      <div className="App">
        <Masthead />
        <Routes>
          <Route path="/" element={<Translate />} />
          <Route path="/detect" element={<Detect />} />
          <Route path="/translatebatch" element={<TranslateBatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
