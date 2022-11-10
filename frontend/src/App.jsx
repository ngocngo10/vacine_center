import './App.css';
import Routing from './Routing';
import { BrowserRouter as Router } from 'react-router-dom';
require('dotenv').config();

function App() {
  return (
    <div className="App">
      <Router>
        <Routing />
      </Router>
    </div>
  );
}

export default App;
