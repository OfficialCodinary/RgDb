const fs = require("fs").promises;

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

    this._initializeDatabase()
    
  }

  /**
   * Initializes the database directory and default data file.
   * @private
   */
  async _initializeDatabase() {
    try {
      fs.access('./Database')
      .catch(async() => {
        await fs.mkdir('./Database')
      })
      fs.access(this._databasePath)
      .catch(async () => {
        await fs.mkdir(this._databasePath);
        await this._createDefaultDataFile();
      })
    } catch (err) {
      console.error("Error initializing database:", err);
    }
  }

  /**
   * Creates the default data file if it doesn't exist.
   * @private
   */
  async _createDefaultDataFile() {
    const defaultDataPath = `${this._databasePath}/allData.json`;
    try {
      await fs.writeFile(defaultDataPath, JSON.stringify([{}]));
    } catch (err) {
      console.error("Error creating default data file:", err);
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

      if (!await this.userExist(userID)) {
        await this._createUser(userID);
      }

      let data = await fs.readFile(path, 'utf8').then(JSON.parse).catch(() => [{}]);
      data[0][dataName] = value;
      await fs.writeFile(path, JSON.stringify(data, null, isBeautify ? 2 : 0));
      return true;
    } catch (err) {
      console.error("Error setting data:", err);
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
    try {
      dataName = dataName.replace(/[A-Z]/g, c => c.toLowerCase());
      const path = userID ? `${this._databasePath}/user-${userID}.json` : `${this._databasePath}/allData.json`;

      if (!await this.userExist(userID)) {
        return defaultValue;
      }

      const data = JSON.parse(await fs.readFile(path, 'utf8'));
      if (Object.keys(data[0]).includes(dataName)) {
        return data[0][dataName];
      } else {
        return defaultValue;
      }
    } catch (err) {
      console.error("Error getting data:", err);
      return defaultValue;
    }
  }

  /**
   * Check if a user's data file exists.
   * @param {string|null} userID - The user identifier.
   * @returns {Promise<boolean>} - Returns true if the user's data file exists, otherwise false.
   */
  async userExist(userID) {
    if (!userID) return true;
    fs.access(`${this._databasePath}/user-${userID}.json`)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
      });
  }

  /**
   * Create a user-specific data file if it doesn't exist.
   * @param {string|null} userID - The user identifier.
   * @returns {Promise<boolean>} - Returns true if the user data file was created, otherwise false.
   */
  async _createUser(userID) {
    if (!userID) return null;
    try {
      if (!await fs.access(`${this._databasePath}/user-${userID}.json`).catch(() => false)) {
        await fs.writeFile(`${this._databasePath}/user-${userID}.json`, '[{}]');
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error creating user data file:", err);
      return false;
    }
  }

  /**
   * Clear all data in the database.
   * @returns {Promise<boolean>} - Returns true if data was cleared successfully, otherwise false.
   */
  async clearAll() {
    try {
      await fs.rm(this._databasePath, { recursive: true });
      return true;
    } catch (err) {
      console.error("Error clearing all data:", err);
      return false;
    }
  }
}

module.exports = Database;
