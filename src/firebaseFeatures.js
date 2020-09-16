// @flow
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import React, {useContext, useEffect, useState} from 'react';
import StartingPage from './components/StartingPage';
import {BrowserRouter as Router} from 'react-router-dom';

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
    return (<h1>Loading...</h1>);
  } else if (authUser === null) {
    return (<Router><StartingPage/></Router>);
  }
  return <AuthUserContext.Provider
      value={authUser}>{children}</AuthUserContext.Provider>;
}
