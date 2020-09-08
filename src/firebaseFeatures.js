// @flow
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useCallback, useEffect, useState} from 'react';

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

const useFirebase = () => {
  const [authUser, setAuthUser] = useState(firebase.auth().currentUser);

  useEffect(() => {
    const unsubscribe = firebase.auth()
        .onAuthStateChanged((user) => setAuthUser(user))
    return () => {
      unsubscribe()
    };
  }, []);

  const signInWithGoogle = useCallback(() => firebase.auth().signInWithPopup(provider), []);
  const signOutFromGoogle = useCallback(() => firebase.auth().signOut(), [])
  return {signInWithGoogle, authUser, signOutFromGoogle}
}

export {firebase, database, useFirebase};
