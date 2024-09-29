import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

export default function ShoppingList() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [shoppingItems, setShoppingItems] = useState([]);
  const db = useSQLiteContext();

  useEffect(() => {
    updateList();
  }, []);

  const saveItem = async () => {
    await db.runAsync('INSERT INTO shopping (product, amount) VALUES (?, ?)', product, amount);
    updateList();
    setProduct('');
    setAmount('');
  };

  const updateList = async () => {
    const list = await db.getAllAsync('SELECT * FROM shopping');
    setShoppingItems(list);
  };

  const deleteItem = async (id) => {
    await db.runAsync('DELETE FROM shopping WHERE id = ?', id);
    updateList();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product"
        value={product}
        onChangeText={setProduct}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Add" onPress={saveItem} />
      
      <FlatList
        data={shoppingItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.product} - {item.amount}</Text>
            <Text style={styles.deleteText} onPress={() => deleteItem(item.id)}>Bought</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  deleteText: {
    color: 'blue',
  },
});
