import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Firebase from 'firebase'
import './App.css';

function App() {
  const [f_state, setFState] = useState(null)

  useEffect(() => {
    var firebaseConfig = {
      apiKey: "YOUR KEY",
      authDomain: "YOUR AUTH DOMAIN",
      databaseURL: "YOUR DATABASE URL",
      projectId: "YOUR PROJECT ID",
      storageBucket: "YOUR STORAGE BUCKET",
      messagingSenderId: "YOUR MESSAGING ID",
      appId: "YOUR APP ID"
    };

    setFState(Firebase.initializeApp(firebaseConfig));

    console.log("Notification status ", Notification.permission)

    if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {

      }).catch((error) => {

      })
    }


  }, [])

  useEffect(() => {
    if (f_state !== null) {
      f_state.messaging().usePublicVapidKey("BHFClBxPX9a0FIaBARP6ZsiVM0ilfpn7g7V_V56xKDK_xpHh0xlhN_lnhXbGpozoJk24MksUD-HuoLuWi5d0hp4")
      f_state.messaging().getToken().then(token => {
        console.log(token)
      })
      f_state.messaging().onTokenRefresh(() => {
        f_state.messaging().getToken().then(token => {
          console.log(token)
        })
      })
      f_state.messaging().onMessage((payload) => {
        console.log("MESSAGE IS HERE", payload)
        new Notification(payload.notification.title, { body: payload.notification.body, image: payload.notification.image })
      })
    }
  }, [f_state])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
