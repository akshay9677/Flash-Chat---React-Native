import React from "react";
import { StyleSheet, Text, View, Button,Image, TouchableOpacity, TouchableNativeFeedback } from "react-native";

import RoundButton from "../components/RoundButtons";

function WelcomeScreen(props){
    const url = '../assets/images/logo.png'
    return(
        <View style={styles.container}>
        <View style={styles.logo}>
        <Image style={styles.images} source={require(url)}/>
        <View style={styles.logoTextContainer}><Text style={styles.logoText}>Flash Chat</Text></View>
        </View>
         <RoundButton onClick={()=>props.navigation.navigate('login')} title='Login' colors='#32e0c4'/>
         <RoundButton onClick={()=>props.navigation.navigate('signup')} title='Signup' colors='#f3c623'/>
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
    flexDirection: 'row',
    marginRight: 50,
    marginLeft: 20
},
images:{
    width: 70,
    height: 70,
    marginTop: 10
},
logoText:{
    fontSize: 40,
    fontWeight: 'bold',
},
logoTextContainer:{
    justifyContent: 'center',
},

})

export default WelcomeScreen;

// f3c623