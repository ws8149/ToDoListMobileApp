import React, {useState} from 'react';
import { Image, TextInput, Text, StyleSheet, Button, TouchableOpacity, View, TouchableHighlight } from "react-native";

export default function TodoItem({item, index, editTodos, showDeleteConfirmation}) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [text, setText] = useState(item.text);

    const handleTextInput = (text) => {
        setText(text);
    }
    const changeToEditMode = () => {
        setIsEditMode(!isEditMode);                
    }

    const handleSave = (key) => {                        
        editTodos(key,text);
        setIsEditMode(!isEditMode);        
    }

    return(
        <TouchableOpacity style={index === 0 ? styles.container0 : styles.container}>            
            
            { isEditMode ? <TextInput style={styles.textInput} 
                                      onChangeText={handleTextInput} 
                                      defaultValue={item.text} /> 
                         : <Text style={styles.item}>{item.text}</Text>  }                        

                                    
            { isEditMode ? ( <TouchableHighlight style={styles.imgContainer} onPress={() => handleSave(item.key)}>
                                <Image style={styles.icon}
                                       source={require('../assets/save.png')}/>
                            </TouchableHighlight> )
                        : <View/> }
            
            { isEditMode ? <View/> 
                         : ( <TouchableHighlight style={styles.imgContainer} onPress={() => changeToEditMode()}>
                                <Image style={styles.icon} source={require('../assets/edit-pen2.png')} />
                            </TouchableHighlight> )}
            
            <TouchableHighlight style={styles.imgContainer} onPress={() => showDeleteConfirmation(item.key)}>
                <Image style={styles.icon} source={require('../assets/delete.png')} />
            </TouchableHighlight>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {        
        flex: 1,
        marginLeft: 20,                
        marginTop: 5,
        padding: 5,               
    },
    textInput: {
        flex: 1,
        padding: 10,
        marginRight: 10,
        borderWidth: 1
    },
    container0: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,        
        borderWidth: 1                
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,    
        borderLeftWidth: 1,
        borderRightWidth: 1,        
        borderBottomWidth: 1,            
    },    
    icon: {
        width: 20,
        height: 20        
    },
    imgContainer: {
        padding: 10
    }
    
})
