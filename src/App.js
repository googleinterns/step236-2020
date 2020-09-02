import React from 'react';
import {BrowserRouter as Router,
  Switch,
  Route,
  Redirect} from 'react-router-dom';
import './App.css';
import AdminFrontPage from './components/admin/Admin';
import InviteeForm from './components/form/InviteeForm';
import LandingPage from './components/landingPage/LandingPage';
import mockAuth, {useFirebaseAuthentication} from './components/Authenticator';
import StartingPage from './components/StartingPage';
import SelfServicePage from './components/selfServicePage/SelfServicePage';

const PrivateRoute = ({authFunction, component, redirectPath}) => (
  <Route
    render={() => {
      if (authFunction()) {
        return component;
      }
      return (<Redirect to={redirectPath}/>);
    }} />
);

function App() {
  const authUser = useFirebaseAuthentication();

  return (
      <Router>
        <div>
          <Switch>
            <PrivateRoute
                path="/"
                exact
                authFunction={() => !mockAuth.isUser(authUser)}
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
                authFunction={mockAuth.isAdmin}
                component={<AdminFrontPage />}
                redirectPath={'/'}>
            </PrivateRoute>

            <PrivateRoute
                path="/landing-page"
                authFunction={() => mockAuth.isUser(authUser)}
                component={<LandingPage/>}
                redirectPath={'/'}>
            </PrivateRoute>

            <PrivateRoute
                path="/self-service"
                authFunction={() => mockAuth.isUser(authUser)}
                component={<SelfServicePage/>}
                redirectPath={'/'}>
            </PrivateRoute>

            <PrivateRoute
                path="/restricted-area"
                authFunction={() => mockAuth.isUser(authUser)}
                component={<h1>Restricted area (redirect?)</h1>}
                redirectPath={'/'}
            />

          </Switch>
        </div>
      </Router>
  );
}

export default App;
