import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  Button,  
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

export default function AddTodo({addTodos}) {
    const [text, setText] = useState('');
    const textInputRef = React.useRef();

    const handleSubmit = () => {
      addTodos(text);
      textInputRef.current.clear();
      setText('');
    }

    const changeText = (val) => {
        setText(val);
    }
    return (
        <View>        
            <TextInput 
                style={styles.input}placeholder="What would you like to do?" 
                onChangeText={changeText} 
                ref={textInputRef}
                onSubmitEditing={()=>{handleSubmit()}}
            />           
            <Button title="Add Todo" onPress={()=>{
                handleSubmit()
            }}/>
        </View>
    )

    
    
}
const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        padding: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView:{
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      confirmationBtns: {          
          flexDirection: 'row'
      }

})