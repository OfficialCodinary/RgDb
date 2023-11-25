## RgDb Library Documentation

### Overview
The `RgDb` library provides a simple database system for storing and managing data.

### Installation
To install the library, use npm:
```bash
npm install rgdb
```

### Usage
Import the library:
```javascript
const RgDb = require('rgdb');
```

Create an instance of the database:
```javascript
const myDatabase = new RgDb('myDatabaseName');
```

### Class: Database

Represents a simple database for storing and managing data.

#### Constructor
Creates a new Database instance.
```javascript
new Database(databaseName)
```
- `databaseName` (`string`): The name of the database.

#### Methods

#### `setData(userID, dataName, value, isBeautify=false)`
Sets data for a user or the general dataset.
```javascript
await myDatabase.setData(userID, dataName, value, isBeautify);
```
- `userID` (`string|null`): The user identifier.
- `dataName` (`string`): The name of the data to set.
- `value` (`*`): The value to set.
- `isBeautify` (`boolean`, optional): Whether to beautify the JSON (default: `false`).
- Returns a `Promise<boolean>`: Returns `true` if successful, `false` otherwise.

#### `getData(userID, dataName, defaultValue=false)`
Gets data for a user or the general dataset.
```javascript
await myDatabase.getData(userID, dataName, defaultValue);
```
- `userID` (`string|null`): The user identifier.
- `dataName` (`string`): The name of the data to retrieve.
- `defaultValue` (`*`, optional): The default value if data doesn't exist (default: `false`).
- Returns a `Promise<*>`: Returns the retrieved data or the default value.

#### `clearAll()`
Clears all data in the database.
```javascript
await myDatabase.clearAll();
```
- Returns a `Promise<boolean>`: Returns `true` if data was cleared successfully, otherwise `false`.

###Basic Example:
```javascript
const db = new Database('myDatabase');

db.setData('user123', 'age', 25)
  .then(success => {
    if (success) {
      console.log('Data set successfully!');
    } else {
      console.log('Failed to set data.');
    }
  });

db.getData('user123', 'age', 'No age found')
  .then(data => {
    console.log('User age:', data);
  });

db.clearAll()
  .then(success => {
    if (success) {
      console.log('Database cleared successfully!');
    } else {
      console.log('Failed to clear the database.');
    }
  });

```

### Support and Help
For further assistance or support, contact **@ROBBING_GAMER** on Telegram.

This documentation should help users understand and utilize the functionalities provided by the `RgDb` library effectively.