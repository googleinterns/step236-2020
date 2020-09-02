// @flow
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
const signInWithGoogle = () => auth.signInWithPopup(provider);

const database = firebase.firestore();
const signOutFromGoogle = () => auth.signOut();
export {firebase, database, auth, signInWithGoogle, signOutFromGoogle};
