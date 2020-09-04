import React, { Component, useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
} from 'react-native';

const DeleteModal = ({modalVisible,setModalVisible, deleteTodos, keyToDelete}) => {
    
    return (
        <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText} > Are you sure? </Text>
              <View style={styles.buttonsContainer}>                
                <TouchableOpacity 
                    title='Yes' 
                    style={styles.buttons}
                    onPress={()=>{                    
                        setModalVisible(false);                    
                        deleteTodos(keyToDelete);
                    }}>
                      <Text style={styles.btnText}>Yes</Text> 
                </TouchableOpacity>
                
                <View style={{width: 1}}/>
                
                <TouchableOpacity                    
                    style={styles.buttons}
                    onPress={()=>{setModalVisible(false)}}>
                      <Text style={styles.btnText}>No</Text>
                </TouchableOpacity>              
              </View>
            </View>               
          </View>                
        </Modal>

    )
}

export default DeleteModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginTop: 22,
        backgroundColor: `rgba(0,0,0,0.6)`       
      },
      modalView:{        
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,        
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,        
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      buttonsContainer: {                
        flexDirection: 'row',        
        justifyContent: 'space-around',        
        
      },
      buttons: {          
          flex: 1,
          paddingVertical: 10,          
          backgroundColor: '#0096FA'
      },
      btnText: {
        textAlign: 'center',
        color: 'white'
      }
      
})
