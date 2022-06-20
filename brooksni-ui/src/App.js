import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import CreatePage from './pages/CreatePage';
import Navigation from './components/Navigation';

import { useState } from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>Exercise Tracker</h1>
          <p>Keep track of your exercise routine! Add, edit, delete, and update your exercises!</p>
          <Navigation />
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/edit">
            <EditPage exerciseToEdit = {exerciseToEdit}/>
          </Route>
          <Route path="/create">
            <CreatePage />
          </Route>
        </header>
        <footer className='App-footer'>
          <p>&copy; 2022 Nicholas Brooks</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
