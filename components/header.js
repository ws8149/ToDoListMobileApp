import React from 'react';
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
    return(
        <View style={styles.header}>
            <Text style={styles.headerText}>
                To Do List
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {                
        padding: 20,
        backgroundColor: '#0096FA',                       
        
    },    
    headerText: {            
        textAlign: 'center',
        color: 'white',
        fontSize: 30,        
    }
})
