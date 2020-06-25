import React, { useEffect } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { createStore,combineReducers,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import Redux from "redux-thunk";
import * as firebase from 'firebase';

import ChatNavigation from "./navigation/chatNavigation";
import authReducer from './store/reducer/auth';
import chatReducer from "./store/reducer/chat"



const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer
})

const store = createStore(rootReducer,applyMiddleware(Redux));

export default function App(props) {
  var firebaseConfig = {
    apiKey: "api-key",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "sender-id",
    appId: "app-id",
    measurementId: "G-measurement-id",
  };
  useEffect(()=>{
      firebase.initializeApp(firebaseConfig);
   
    
  },[firebaseConfig])

  


  return(<Provider store={store}>
  <ChatNavigation />
  </Provider>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center'
  },
});


