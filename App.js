import React, { Component, useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
  Button,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage
} from 'react-native';

import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import DeleteModal from './components/deleteModal';


export default function App() {
  // const [todos, setTodos] = useState([
  //   { text: 'todo1', key: '1' },
  //   { text: 'todos2', key: '2'},
  //   { text: 'todos3', key:'3'}
  // ])    
  const [todos, setTodos] = useState([])    
  const [modalVisible, setModalVisible] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState('');
  const isInitialMount = useRef(true);

  useEffect(() => {    
    if (isInitialMount.current) {
      isInitialMount.current = false;
      loadTodos();
    } else {
      saveTodos();
    }    
  }, [todos])

   
  const deleteTodos = (key) => {    
    setTodos((prevTodos)=> {
      return prevTodos.filter(todo => todo.key != key)
    })
  }

  const showDeleteConfirmation = (key) => {
    setModalVisible(true);
    setKeyToDelete(key);
  }

  const addTodos = (text) => {        
    if (text === '') { return; }

    const duplicateItem = todos.find(todo => todo.text === text );    
    if (duplicateItem ) { 
      alert('Todo has already been created')
      return;
    }

    
    setTodos((prevTodos)=> {
      return [{text: text, key: (Math.ceil(Math.random()*100)).toString()}, ...prevTodos]
    })
    
    
  }

  const editTodos = ( key, text ) => {           
    
    setTodos((prevTodos)=> {
      return prevTodos.map( todo => {
        if (todo.key === key) {
          return {text: text, key: key}
        } else {
          return todo;
        }        
      })
    })
  }

  const saveTodos = async() => {    
    try {
      await AsyncStorage.setItem('stored_todos', JSON.stringify(todos))  
    } catch (e) {
      console.log('Failed to save .' + e)
    }
  } 
  

  const loadTodos = async () => {
    try {
      const loadedTodos = await AsyncStorage.getItem('stored_todos')
      if (loadedTodos !== null) {
        setTodos(JSON.parse(loadedTodos))
      }
    } catch (e) {
      console.log('Failed to load .')
    }
  }
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} >      
        <Header/>      
        <View style={styles.content}>
        <DeleteModal 
          setModalVisible={setModalVisible} 
          modalVisible={modalVisible}
          deleteTodos={deleteTodos}
          keyToDelete={keyToDelete}
        />
        <AddTodo addTodos={addTodos}/>
        <View style={styles.list}>
          <FlatList
            keyboardShouldPersistTaps='always'
            data={todos}
            renderItem={({item, index})=>(
              <TodoItem                   
                showDeleteConfirmation={showDeleteConfirmation} 
                editTodos={editTodos} 
                index={index}
                item={item}/>
            )}
          />
          </View>        
        </View>      
      </View>
    </TouchableWithoutFeedback>
  );
  
}

const styles = StyleSheet.create({
  todoItem: {
    fontSize: 10
  },
  container: {
    flex: 1,    
  },
  content: {
    padding: 40,    
  },
  list: {
    marginTop: 20
  }
  
  
  


});
