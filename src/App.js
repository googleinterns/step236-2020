import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import AdminFrontPage from './components/admin/Admin';
import InviteeForm from './components/form/InviteeForm';
import LandingPage from './components/landingPage/LandingPage';
import firebaseAuthenticator from './components/Authenticator';
import StartingPage from './components/StartingPage';
import SelfServicePage from './components/selfServicePage/SelfServicePage';
import {useFirebase} from './firebaseFeatures';

function PrivateRoute({authFunction, component, redirectPath}) {
  const [authorisationStatus, setAutorisationStatus] = useState(null);

  useEffect(() => {
    authFunction().then((newValue) => {
      setAutorisationStatus(newValue);
    });
  });

  if (authorisationStatus === null) {
    return <h1>Loading...</h1>;
  }

  if (authorisationStatus) {
    return component;
  }
  return <Redirect exact key={redirectPath} to={redirectPath}/>;
}

function App() {
  const authUser = useFirebase().authUser;

  return (
      <Router>
        <div>
          <Switch>
            <PrivateRoute
                path="/"
                exact
                key="/"
                authFunction={() => {
                  return firebaseAuthenticator.isUser(authUser)
                      .then(result => !result);
                }}
                component={<StartingPage/>}
                redirectPath={'/landing-page'}>
            </PrivateRoute>

            <Route path="/form">
              <InviteeForm propagateNewInviteeForm={
                (form) => {
                  console.log(form);
                  window.location.replace('/');
                }
              }/>
            </Route>

            <PrivateRoute
                path="/admin"
                key="/admin"
                authFunction={() => firebaseAuthenticator.isAdmin(authUser)}
                component={<AdminFrontPage/>}
                redirectPath={'/'}>
            </PrivateRoute>

            <PrivateRoute
                path="/landing-page"
                key="/landing-page"
                authFunction={() => firebaseAuthenticator.isUser(authUser)}
                component={<LandingPage/>}
                redirectPath={'/'}>
            </PrivateRoute>

            <PrivateRoute
                path="/self-service"
                key="/self-service"
                authFunction={() => firebaseAuthenticator.isUser(authUser)}
                component={<SelfServicePage/>}
                redirectPath={'/'}>
            </PrivateRoute>

            <PrivateRoute
                path="/restricted-area"
                key="/restricted-area"
                authFunction={() => firebaseAuthenticator.isUser(authUser)}
                component={<h1>Restricted area (redirect?)</h1>}
                redirectPath={'/'}
            />

          </Switch>
        </div>
      </Router>
  );
}

export default App;
