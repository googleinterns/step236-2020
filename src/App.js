import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/form">Membership form</Link>
            </li>
            <li>
              <Link to="/admin">Admin page</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/form">
            {/* TO DO: ADD FORM COMPONENT HERE [BEHIND A SIGN IN PAGE].*/}
            <h1>This is the route to membership form.</h1>
          </Route>

          <Route path="/admin">
            {/*TO DO: ADD ADMIN COMPONENT HERE [BEHIND A SIGN IN PAGE]. */}
            <h1>This is the route to the admin page.</h1>
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
