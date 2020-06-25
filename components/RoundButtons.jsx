import React from "react";
import { StyleSheet,View,Text } from "react-native";

function RoundButton(props){
    return(
        <View style={styles.buttonContainer}>
        <Text style={{...styles.button,...{backgroundColor: props.colors,borderColor: props.colors}}} onPress={props.onClick}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        marginTop:20,
        marginBottom: 5
    },
    button:{
        fontSize: 16,
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 150,
        borderRadius: 50,
        color: 'white'
    }
})

export default RoundButton;