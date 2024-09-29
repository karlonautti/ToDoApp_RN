import { SQLiteProvider } from 'expo-sqlite';
import ShoppingList from './components/ShoppingList';

export default function App() {

  const initialize = async (db) => {
    // alustetaan tietokanta
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS shopping (id INTEGER PRIMARY KEY NOT NULL, product TEXT, amount TEXT);
      `);
  };

  return (
    <SQLiteProvider
      databaseName='shoppinglist.db'
      onInit={initialize}
      onError={error => console.error('Could not open database', error)}
    >
      <ShoppingList />
    </SQLiteProvider>
  )
}
