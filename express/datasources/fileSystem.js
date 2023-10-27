const fs = require("fs").promises;
const { handleError } = require("../ultils");

function FileSystemDataSource(databasePath = "") {
  this.databasePath = databasePath;

  this.readCollection = function readCollection(collectionName = "") {
    const collectionPath = `${
      this.databasePath
    }/${collectionName.toLowerCase()}.json`;
    return fs
      .readFile(collectionPath)
      .then((data) => {
        const parsedData = JSON.parse(data);
        return parsedData;
      })
      .catch((err) => {
        handleError(err, "datasources/fileSystem.js", "readCollection");
        return [];
      });
  };

  this.updateCollection = function updateCollection(
    collectionName = "",
    newData
  ) {
    const collectionPath = `${
      this.databasePath
    }/${collectionName.toLowerCase()}.json`;
    return fs
      .writeFile(collectionPath, JSON.stringify(newData))
      .then(() => newData)
      .catch(() => {
        return fs
          .mkdir(database)
          .then(() => fs.writeFile(this.databasePath, JSON.stringify(newData)))
          .catch((err) => {
            handleError(err, "datasources/fileSystem.js", "updateCollection");
          });
      });
  };
}

module.exports = FileSystemDataSource;
