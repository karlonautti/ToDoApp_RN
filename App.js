import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handlePress = () => {
    setTodos([{ key: todo }, ...todos]);
    setTodo('');

  }

  const handleClear = () => {
    setTodos([]);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Enter a new task...'
        onChangeText={text => setTodo(text)}
        value={todo}
        >
      </TextInput>
      
      <View style={styles.buttonContainer}>
        <Button 
          color='green' 
          title='Add' 
          onPress={handlePress}></Button>
      
        <Button 
          color='red' 
          title='Clear' 
          onPress={handleClear}></Button>
      </View>

      <FlatList
      data={todos}
      renderItem={({item}) => <Text style={styles.listItem}>{item.key}</Text>}
      ListHeaderComponent={<Text style={styles.listHeader}>Shopping List</Text>}
      ListEmptyComponent={<Text style={styles.emptyComponent}>No Data</Text>}
      ItemSeparatorComponent={
        <View style={styles.itemSeparator}></View>}
      >
      </FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  buttonContainer: {
    flexDirection: 'row',
  },

  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    width: 200,
    textAlign: 'center',
    margin: 5,
    marginBottom: 5,
    fontSize: 16,
  },

  itemSeparator: {
    height: 1,
    backgroundColor: 'black',
    margin: 5,
  },

  listHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  listItem: {
    textAlign: 'center',
    fontSize: 20,
  },

  emptyComponent: {
    textAlign: 'center',
  },
});
