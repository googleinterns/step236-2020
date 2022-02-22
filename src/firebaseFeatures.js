/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @flow
import  firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import React, {useContext, useEffect, useState} from 'react';
import StartingPage from './components/StartingPage';
import {BrowserRouter as Router} from 'react-router-dom';
import LoadingPlaceholder from './components/LoadingPlaceholder';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
const database = firebaseApp.firestore();
const auth = firebaseApp.auth();
const fieldValue = firebase.firestore.FieldValue;
const timestamp = firebase.Timestamp;
export {firebase, database, fieldValue, timestamp};

const useFirebase = () => {
  const [authUser, setAuthUser] = useState(undefined);
  useEffect(() => {
    const unsubscribe = auth
        .onAuthStateChanged((user) => setAuthUser(user));
    return () => {
      unsubscribe();
    };
  }, []);

  return authUser;
};

export function signOutFromGoogle() {
  auth.signOut();
}

export function signInWithGoogle() {
  auth.signInWithPopup(provider);
}

const AuthUserContext = React.createContext<any>(undefined);

export function useAuthUser() {
  return useContext(AuthUserContext);
}

export function UserContext({children}: any) {
  const authUser = useFirebase();

  if (authUser === undefined) {
    return (<LoadingPlaceholder/>);
  } else if (authUser === null) {
    return (<Router><StartingPage/></Router>);
  }
  return <AuthUserContext.Provider
      value={authUser}>{children}</AuthUserContext.Provider>;
}
