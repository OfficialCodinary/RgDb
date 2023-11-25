

## RgDb Library

### Overview
RgDb is a simple database for storing and managing data within Node.js applications.

### Installation
To install RgDb, use npm:
```bash
npm install rgdb
```

### Usage
```javascript
const RgDb = require('rgdb');

// Create a new database instance
const myDatabase = new RgDb('myDatabaseName');

// Set data
myDatabase.setData('userID', 'dataName', 'value')
  .then(success => {
    if (success) {
      console.log('Data set successfully.');
    } else {
      console.error('Failed to set data.');
    }
  });

// Get data
myDatabase.getData('userID', 'dataName')
  .then(data => {
    console.log('Retrieved data:', data);
  });

// Clear all data in the database
myDatabase.clearAll()
  .then(success => {
    if (success) {
      console.log('Database cleared successfully.');
    } else {
      console.error('Failed to clear database.');
    }
  });
```

### API Reference

#### `new RgDb(databaseName)`
- Constructor to create a new database instance.
- **Parameters:**
  - `databaseName` (string): The name of the database.

#### `setData(userID, dataName, value, isBeautify = false)`
- Set data for a user or the general dataset.
- **Parameters:**
  - `userID` (string|null): The user identifier.
  - `dataName` (string): The name of the data to set.
  - `value` (*): The value to set.
  - `isBeautify` (boolean, optional): Whether to beautify the JSON. Default is `false`.
- **Returns:** `Promise<boolean>` - Returns `true` if successful, `false` otherwise.

#### `getData(userID, dataName, defaultValue = false)`
- Get data for a user or the general dataset.
- **Parameters:**
  - `userID` (string|null): The user identifier.
  - `dataName` (string): The name of the data to retrieve.
  - `defaultValue` (*, optional): The default value if data doesn't exist. Default is `false`.
- **Returns:** `Promise<*>` - Returns the retrieved data or the default value.

#### `clearAll()`
- Clear all data in the database.
- **Returns:** `Promise<boolean>` - Returns `true` if data was cleared successfully, `false` otherwise.

### Support and Help
For assistance and support, contact **@ROBBING_GAMER** on Telegram.

---

Feel free to hit a PR to fix any errors you come across!