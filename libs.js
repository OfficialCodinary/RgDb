const fs = require("fs")

async function setupDb() {
    if (!fs.existsSync("./Database")) {
        fs.mkdirSync("./Database");
    }
    if (!fs.existsSync("./Database/Users")) {
        fs.mkdirSync("./Database/Users");
    }
    if (!fs.existsSync("./Database/Global")) {
        fs.mkdirSync("./Database/Global");
        fs.writeFileSync("./Database/Global/allData.json", "[{}]")
    }
}

async function createUser(userId) {
    try {
        await setupDb()
        if (!userId) {
            return null
        }
        const path = "./Database/Users"
        if (!fs.existsSync(path + "/" + userId + ".json")) {
            const fileNames = [userId + ".json;[{}]"];
            fileNames.forEach((fileName) => {
                fs.writeFileSync(path + "/" + fileName.split(';')[0], fileName.split(';')[1]);
            });
            console.log("User Created: " + userId)
            return true
        } else return false
    } catch (err) {
        console.log(err)
        return false
    }
}

async function setData(userId, dataName, value, type, isBeautify) {
    try {
        await setupDb()

        type = type.replace(/[^a-zA-Z]/g, '').toLowerCase()
        dataName = dataName.replace(/[a-zA-Z]/g, c => c.toLowerCase())
        var path, data;
        if (type != "global" && type != "private") return null
        if (type == "global") path = "./Database/Global/allData.json"
        if (type == "private") path = "./Database/Users/" + userId + ".json"; if (!await userExist(userId)) await createUser(userId);
        if (!fs.existsSync(path)) data = [{}]; else data = JSON.parse(fs.readFileSync(path))
        data[0][dataName] = value
        if (typeof isBeautify != 'boolean') isBeautify = false
        if (isBeautify == true) {
            fs.writeFileSync(path, JSON.stringify(data, null, 4));
            return true;
        } else {
            fs.writeFileSync(path, JSON.stringify(data, null, 0));
            return true
        }
    } catch (err) {
        console.log(err)
        return false
    }

}

async function getData(userId, dataName, type, defaultValue = false) {
    await setupDb()
    type = type.replace(/[A-Z]/g, c => c.toLowerCase())
    dataName = dataName.replace(/[A-Z]/g, c => c.toLowerCase())
    var path;

    if (type != "global" && type != "private") return null
    if (type == "global") path = `./Database/Global/allData.json`
    if (type == "private") { path = `./Database/Users/${userId}.json`; if (!await userExist(userId)) return defaultValue }

    var data = JSON.parse(fs.readFileSync(path, "utf8"))

    if (Object.keys(data[0]).includes(dataName)) {
        return data[0][dataName];
    } else {
        return defaultValue
    }
}

async function userExist(filePath) {
    await setupDb()
    if (fs.existsSync('./Database/Users/' + filePath + '.json')) {
        return true;
    } else {
        return false;
    };
}

async function clearAll() {
    try {
        fs.rmSync('./Database')
        await setupDb()
        return true
    } catch (err) {
        return false;
    }
}

module.exports = {
    createUser: createUser,
    userExist: userExist,
    setData: setData,
    getData: getData,
    clearAll: clearAll
}