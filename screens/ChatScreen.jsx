import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableWithoutFeedback, FlatList, KeyboardAvoidingView, Dimensions, ToastAndroid, ActivityIndicator,AsyncStorage } from "react-native";
import { MaterialCommunityIcons,FontAwesome } from '@expo/vector-icons';
import { useSelector,useDispatch } from 'react-redux';
import * as firebase from 'firebase';

import * as authActions from '../store/action/auth';

function ChatScreen(props){
    const [text,setText] = useState('');
    const email = props.navigation.getParam('email');
    const [arr,setArr] = useState([]);
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
  useEffect( ()=>{
    //   saveDataToStorage(arr);
     firebase.database().ref('/chat').on('value',(data)=>{
        ToastAndroid.show('Welcome to Flash Chat',ToastAndroid.SHORT);
        var temp = []
       data.forEach(ss=>{
          
           temp.push({send:ss.child('sender').val(),text:ss.child('text').val()})
       })
       setArr(temp.reverse());
     })
  },[])
    
//   function saveDataToStorage(chatArray){
//     AsyncStorage.setItem('userData',
//     JSON.stringify({
//         chat : chatArray
//     }))
// }

      
       
     function sendText(){
         setTimeout(()=>{
            var key = firebase.database().ref('/chat').push().key;
            firebase.database().ref('/chat').child(key).set({sender: email,text:text});
            setText('');
         },100)
           
        
        
         
     }

     

    
     function body(dataa){
         if(loading){
          <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
              <ActivityIndicator size='large' color='yellow' />
          </View>
         }else if(dataa.send === props.navigation.getParam('email')){
                 return(
                    <View key={dataa.id} style={styles.bubble}><Text style={{...styles.senderBubble,...{textAlign: 'right',marginRight:10}}}>{dataa.send}</Text>
                    <Text style={styles.textBubble}>{dataa.text}</Text>
                    </View>
                 )
             }else{
                return(
                    <View key={dataa.id} style={{marginRight: Dimensions.get('window').width / 1.5,marginLeft: 10,}}><Text style={styles.senderBubble}>{dataa.send}</Text>
                    <Text style={styles.textBubble2}>{dataa.text}</Text>
                    </View>
                 )
             }
         
     }
     
    return(
        <KeyboardAvoidingView style={{flex: 1}} >
          <View style={styles.appBarContainer}>
        <View style={styles.appBar}>
        <Image style={styles.appBarImages} source={require('../assets/images/logo.png')} />
        <Text style={styles.appBarText}>Flash Chat</Text>
        </View>
        <TouchableWithoutFeedback onPress={()=>{
            dispatch(authActions.logout());
            props.navigation.navigate('welcome')
        }}><View style={styles.appBarLogout}>
        <MaterialCommunityIcons  name="logout" size={30} color="white"/>
        </View></TouchableWithoutFeedback>
       </View>
  <View style={{flex: 0.9,marginBottom:10}}>
  <FlatList
        data={arr}
        keyExtractor={item=>item.id}
        renderItem={itemData=>  body(itemData.item)}
        inverted={true}

        />
  </View>
    <View style={{flex: 0.1}} >
            <View style={styles.chatContainer}>
            <TextInput  style={styles.chatBox} value={text}   onChangeText={text=> setText(text)} placeholder='Enter Message' placeholderTextColor='white'/>
            <View style={styles.sendButton}>
            <TouchableWithoutFeedback onPress={sendText}>
            <FontAwesome name="send" size={24} color="white" />
            </TouchableWithoutFeedback>
            </View>
        </View>
    </View>
</KeyboardAvoidingView>
       
        
    )
}

const styles = StyleSheet.create({
appBarContainer:{
    height: 80,
    backgroundColor: '#32e0c4',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 10,
},
appBar:{
    marginTop: 30,
    flexDirection: 'row',
    margin: 10
},
appBarText:{
    fontSize:30,
    fontWeight: 'bold',
    color: 'white'
},
appBarImages:{
    width: 40,
    height: 40
},
appBarLogout:{
    marginTop:35,
    marginLeft: Dimensions.get('window').width / 3
},
chatContainer:{
    borderWidth: 0,
    flexDirection: 'row',
    height: 60,
    borderWidth:5,
    borderColor: '#f3c623',
    borderRadius: 50,
    marginHorizontal: 6,
    backgroundColor: '#32e0c4',
    paddingBottom: 10,
    position: 'absolute',
  left: 10,
  bottom: 10,
  right:10,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  overflow: 'hidden'
},
chatBox:{
    paddingHorizontal: 30,
    fontSize: 18,
    width: Dimensions.get('window').width / 1.2 ,
    color: 'white',
    
},
sendButton:{
    marginTop:12,
    marginRight: 17
},
bubble:{
    marginLeft:Dimensions.get('window').width / 1.5,
},
senderBubble:{
    fontSize: 10
},
textBubble:{
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#f3c623',
    backgroundColor: '#f3c623',
    color: 'white',
    borderTopLeftRadius:50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 14,
    marginVertical: 4,
    elevation: 10,
},
textBubble2:{
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#f3c623',
    backgroundColor: 'white',
    color: 'black',
    borderTopRightRadius:50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginVertical: 2,
    elevation: 10,
}
})

export default ChatScreen;