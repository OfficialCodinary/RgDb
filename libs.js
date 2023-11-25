const fs = require("node:fs");

/**
 * Represents a simple database for storing and managing data.
 */
class Database {
  /**
   * Create a Database instance.
   * @param {string} databaseName - The name of the database.
   */
  constructor(databaseName) {
    /** @private */
    this._databaseName = databaseName;
    /** @private */
    this._databasePath = `./Database/${this._databaseName}`;

    // Create the parent directory if it doesn't exist
    if (!fs.existsSync('./Database')) {
      fs.mkdirSync('./Database');
    }

    // Create the database directory if it doesn't exist
    if (!fs.existsSync(this._databasePath)) {
      fs.mkdirSync(this._databasePath);
    }

    // Create the default data file if it doesn't exist
    const defaultDataPath = `${this._databasePath}/allData.json`;
    if (!fs.existsSync(defaultDataPath)) {
      fs.writeFileSync(defaultDataPath, JSON.stringify([{}]));
    }
  }

  /**
   * Set data for a user or the general dataset.
   * @param {string|null} userID - The user identifier.
   * @param {string} dataName - The name of the data to set.
   * @param {*} value - The value to set.
   * @param {boolean} [isBeautify=false] - Whether to beautify the JSON.
   * @returns {Promise<boolean>} - Returns true if successful, false otherwise.
   */
  async setData(userID, dataName, value, isBeautify = false) {
    try {
      dataName = dataName.replace(/[a-zA-Z]/g, c => c.toLowerCase());
      const path = userID ? `${this._databasePath}/user-${userID}.json` : `${this._databasePath}/allData.json`;

      if (!await this._userExist(userID)) {
        await this._createUser(userID);
      }

      let data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : [{}];
      data[0][dataName] = value;
      fs.writeFileSync(path, JSON.stringify(data, null, isBeautify ? 2 : 0));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  /**
   * Get data for a user or the general dataset.
   * @param {string|null} userID - The user identifier.
   * @param {string} dataName - The name of the data to retrieve.
   * @param {*} [defaultValue=false] - The default value if data doesn't exist.
   * @returns {Promise<*>} - Returns the retrieved data or the default value.
   */
  async getData(userID, dataName, defaultValue = false) {
    dataName = dataName.replace(/[A-Z]/g, c => c.toLowerCase());
    const path = userID ? `${this._databasePath}/user-${userID}.json` : `${this._databasePath}/allData.json`;

    if (!await this._userExist(userID)) {
      return defaultValue;
    }

    const data = JSON.parse(fs.readFileSync(path, "utf8"));

    if (Object.keys(data[0]).includes(dataName)) {
      return data[0][dataName];
    } else {
      return defaultValue;
    }
  }

  /**
   * Check if a user's data file exists.
   * @param {string|null} userID - The user identifier.
   * @returns {Promise<boolean>} - Returns true if the user's data file exists, otherwise false.
   */
  async _userExist(userID) {
    if (!userID) return true;
    return fs.existsSync(`${this._databasePath}/user-${userID}.json`);
  }

  /**
   * Create a user-specific data file if it doesn't exist.
   * @param {string|null} userID - The user identifier.
   * @returns {Promise<boolean>} - Returns true if the user data file was created, otherwise false.
   */
  async _createUser(userID) {
    if (!userID) {
      return null;
    }

    if (!fs.existsSync(`${this._databasePath}/user-${userID}.json`)) {
      fs.writeFileSync(`${this._databasePath}/user-${userID}.json`, '[{}]');
      return true;
    }

    return false;
  }

  /**
   * Clear all data in the database.
   * @returns {Promise<boolean>} - Returns true if data was cleared successfully, otherwise false.
   */
  async clearAll() {
    try {
      fs.rmSync(this._databasePath, {
        recursive: true
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = Database;
