import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app';

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

ReactDOM.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
