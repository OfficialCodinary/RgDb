# RgDb Library Documentation

This documentation provides an overview and usage guide for the RgDb Library. The library offers functions for creating and managing user data in a file-based database system. Let's explore the available functions and their usage.

## Table of Contents

- [Installation](#installation)
- [Functions](#functions)
  - [createUser](#createuser)
  - [setData](#setdata)
  - [getData](#getdata)
  - [userExist](#userexist)

## Installation

Before using the library, make sure you have Node.js installed on your system. You can obtain the latest version from the official [Node.js website](https://nodejs.org).

To install the library, you can use npm, the package manager for Node.js. Open your terminal and run the following command:

```shell
npm install your-library-name
```

## Functions
### createUser

```javascript
async function createUser(userId)
```

The `createUser` function creates a new user in the database. It takes a `userId` parameter as input and generates a corresponding user file in the database directory.

**Parameters:**

- `userId` (string): The ID of the user to create.

**Returns:**

- Returns `true` if the user is created successfully.
- Returns `false` if the user already exists or if the `userId` parameter is not provided.

**Example:**

```javascript
const created = await createUser("john123");
if (created) {
  console.log("User created successfully.");
} else {
  console.log("User already exists or invalid userId provided.");
}
```

### setData

```javascript
async function setData(userId, dataName, value, type, isBeautify)
```

The `setData` function allows you to set data for a specific user in the database. You can specify the user ID, the data name, the value to set, the type of data (global or private), and whether to beautify the resulting JSON file.

**Parameters:**

- `userId` (string): The ID of the user to set data for.
- `dataName` (string): The name of the data field.
- `value` (any): The value to set for the specified data field.
- `type` (string): The type of data. Valid values are "global" or "private".
- `isBeautify` (boolean, optional): Whether to beautify the resulting JSON file. Default is `false`.

**Returns:**

- Returns `true` if the data is set successfully.
- Returns `false` if an error occurs.

**Example:**

```javascript
await setData("john123", "name", "John Doe", "private", true);
```

### getData

```javascript
async function getData(userId, dataName, type, defaultValue = null)
```

The `getData` function retrieves the value of a specific data field for a given user ID from the database. You can specify the user ID, the data name, the type of data (global or private), and an optional default value to return if the data field doesn't exist.

**Parameters:**

- `userId` (string): The ID of the user to retrieve data for.
- `dataName` (string): The name of the data

 field.
- `type` (string): The type of data. Valid values are "global" or "private".
- `defaultValue` (any, optional): The default value to return if the data field doesn't exist. Default is `null`.

**Returns:**

- Returns the value of the specified data field if it exists.
- Returns the `defaultValue` if the data field doesn't exist or an error occurs.

**Example:**

```javascript
const name = await getData("john123", "name", "private", "Unknown");
console.log("User name:", name);
```

### userExist

```javascript
async function userExist(filePath)
```

The `userExist` function checks if a user with the specified file path exists in the database.

**Parameters:**

- `filePath` (string): The file path of the user data file.

**Returns:**

- Returns `true` if the user exists.
- Returns `false` if the user doesn't exist.

**Example:**

```javascript
const exists = await userExist("john123");
if (exists) {
  console.log("User exists.");
} else {
  console.log("User does not exist.");
}
```

## Usage

Here's an example demonstrating the usage of the library:

```javascript
const { createUser, userExist, setData, getData } = require("your-library-name");

  // Create a new user
  const created = await createUser("john123");
  if (created) {
    console.log("User created successfully.");
  } else {
    console.log("User already exists or invalid userId provided.");
  }

  // Set data for the user
  await setData("john123", "name", "John Doe", "private", true);

  // Get data for the user
  const name = await getData("john123", "name", "private", "Unknown");
  console.log("User name:", name);

  // Check if the user exists
  const exists = await userExist("john123");
  if (exists) {
    console.log("User exists.");
  } else {
    console.log("User does not exist.");
  }
}

This concludes the documentation for RgDb Library.
 Feel free to contact [@ROBBING_GAMER](https://t.me/telegram.me/ROBBING_GAMER) on telegram for any help..
