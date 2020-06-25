import React,{useState, useEffect} from "react";
import { StyleSheet, Text, View, Button, Image, TextInput, Alert, ActivityIndicator } from "react-native";
import {useDispatch} from 'react-redux';

import RoundButton from '../components/RoundButtons';
import * as authActions from '../store/action/auth';

function SignupScreen(props){
        const [email,setEmail] = useState('');
        const [password,setPassword] = useState('');
        const [error,setError] = useState();

        const [loading,setLoading] = useState(false);

        const dispatch = useDispatch();

        async function handleClick(){
            setLoading(true);
            try{
                await dispatch(authActions.signup(email,password));
                props.navigation.navigate('chat',{
                    email: email
                })
                
            }catch(e){
                console.log(e);
                setError(e.message);
                setLoading(false);
            }
            setLoading(false);
        }

        useEffect(()=>{
            if(error){
                Alert.alert('Error Occured','Username already exists',[{text:'Okay'}])
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
            {loading ? <ActivityIndicator size='small' color='#f3c623' />  : <RoundButton title='Signup' colors='#f3c623' onClick={handleClick} />}
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
        borderColor: '#fcbf1e',
        borderWidth: 2,
        borderRadius: 50,
        width: 300,
        height: 50,
        paddingVertical: 2,
        paddingHorizontal: 20
    }
})

export default SignupScreen;