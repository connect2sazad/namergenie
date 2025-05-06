// import logo from './logo.svg';
import { BrowserRouter as Router } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './assets/css/custom.css';

import './App.css';
import WebRoutes from './components/webroutes.component';

function App() {
  return (
    <>
      <Router>
        <WebRoutes />
      </Router>
    </>
  );
}

export default App;