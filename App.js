/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import TodoList from './TodoList';

export default class App extends React.Component {
  state = {
    newTodo: '',
    todos: [],
  }

  constructor(props) {
    super(props)
    this.loadTodos()
  }

  onChangeText(newTodo) {
    this.setState({ newTodo })
  }

  onPressAdd() {
    // console.log('onPressAdd')
    const { newTodo } = this.state
    this.setState({
      newTodo: '',
      todos: [newTodo, ...this.state.todos]
    }, () => this.storeTodos())
  }

  onPressDelete(index) {
    // console.log('onPressDelete')
    this.setState({
      todos: this.state.todos.filter((t, i) => i !== index)
    }, () => this.storeTodos())
  }

  storeTodos() {
    const str = JSON.stringify(this.state.todos)
    AsyncStorage.setItem('todos', str)
  }

  loadTodos() {
    AsyncStorage.getItem('todos').then((str) => {
      const todos = str ? JSON.parse(str) : []
      this.setState({ todos })
    })
  }

  render() {
    console.log(this.state)
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <TextInput
            value={this.state.newTodo}
            style={styles.form}
            onChangeText={text => this.onChangeText(text)}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => this.onPressAdd()}
          >
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
          <TodoList
            todos={this.state.todos}
            onPressDelete={(index) => this.onPressDelete(index)}
          />
        </View>
      </SafeAreaView>
    );
  }

};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: 30
  },
  form: {
    backgroundColor: '#EEE',
    padding: 10,
  },
  addButton: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 4,
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
