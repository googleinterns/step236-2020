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
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import React, {useContext, useEffect, useState} from 'react';
import StartingPage from './components/StartingPage';
import {BrowserRouter as Router} from 'react-router-dom';
import LoadingPlaceholder from './components/LoadingPlaceholder';

const firebaseConfig = {
  apiKey: 'AIzaSyByClHaWsJw2jVjIlTQ2FIzaeI6hs0Y7tk',
  authDomain: 'scriba-1d195.firebaseapp.com',
  databaseURL: 'https://scriba-1d195.firebaseio.com',
  projectId: 'scriba-1d195',
  storageBucket: 'scriba-1d195.appspot.com',
  messagingSenderId: '627308594363',
  appId: '1:627308594363:web:f4f6a12dc387f8e196559e',
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
const database = firebase.firestore();
const fieldValue = firebase.firestore.FieldValue;
const timestamp = firebase.Timestamp;
export {firebase, database, fieldValue, timestamp};

const useFirebase = () => {
  const [authUser, setAuthUser] = useState(undefined);
  useEffect(() => {
    const unsubscribe = firebase.auth()
        .onAuthStateChanged((user) => setAuthUser(user));
    return () => {
      unsubscribe();
    };
  }, []);

  return authUser;
};

export function signOutFromGoogle() {
  firebase.auth().signOut();
}

export function signInWithGoogle() {
  firebase.auth().signInWithPopup(provider);
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
