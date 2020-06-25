import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, TextInput, Alert, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";

import RoundButton from "../components/RoundButtons";
import * as authActions from "../store/action/auth";

function LoginScreen(props){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState();

    const dispatch = useDispatch();

    async function handleClick(){
       setLoading(true)
       try{
        await dispatch(authActions.login(email,password));
        props.navigation.navigate('chat',{
            email: email
        })
        
       }catch(e){
        setError(e);
        setLoading(false);
       }
       setLoading(false);
    }

    useEffect(()=>{
        if(error){
            Alert.alert('Error Occured','Check email & password',[{text:"Okay"}]);
        }
    },[error])

    return(
        <View style={styles.container}>
         <Image style={styles.logo} source={require('../assets/images/logo.png')} />
         <View style={styles.inputContainer}>
         <TextInput  style={styles.inputField} placeholder='Email Id'
         onChangeText={text=>setEmail(text)} ></TextInput>
         </View> 
         <View style={styles.inputContainer}>
         <TextInput secureTextEntry style={styles.inputField} placeholder='Password'
         onChangeText={text=> setPassword(text)} ></TextInput>
         </View> 
         {loading ? <ActivityIndicator size='small' color='#32e0c4' /> :<RoundButton title='Login' colors='#32e0c4' onClick={handleClick} />}
        </View>
        

    )
}

const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center'
},
logo:{
    height: 200,
    width: 200
},
inputField:{
    marginTop: 20,
    fontSize: 18,
    borderColor: '#40bad5',
    borderWidth: 2,
    borderRadius: 50,
    width: 300,
    height: 50,
    paddingVertical: 2,
    paddingHorizontal: 20
}


})

export default LoginScreen;