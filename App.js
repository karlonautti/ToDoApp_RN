import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handlePress = () => {
    setTodos([...todos, { key: todo }]);
    setTodo('');

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
      <Button 
        color='green' 
        title='Add' 
        onPress={handlePress}>Add task</Button>
      <FlatList
      data={todos}
      renderItem={({item}) => <Text>{item.key}</Text>}
      ListEmptyComponent={<Text>No Data</Text>}
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
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    width: 200,
    textAlign: 'center',
    margin: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: 'black',
    margin: 5,
  },
});
