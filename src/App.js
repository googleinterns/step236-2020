import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AdminFrontPage from './components/admin/Admin';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/form">
            {/* TO DO: ADD FORM COMPONENT HERE [BEHIND A SIGN IN PAGE].*/}
            <h1>This is the route to membership form.</h1>
          </Route>

          <Route path="/admin">
            <AdminFrontPage />
          </Route>

          <Route path="/">
            <div>
              {/*TO DO: ADD SIGN IN FLOW*/}
              <h1>Main Page</h1>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
