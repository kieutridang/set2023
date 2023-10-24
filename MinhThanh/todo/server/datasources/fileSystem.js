const fs = require("fs").promises;
const { handleError } = require("../helpers");

function FileSystemDataSource(databasePath = "") {
  this.databasePath = databasePath;
  // Example : databasePath is './database'

  this.readCollection = function readCollection(collectionName = "") {
    const collectionPath = `${
      this.databasePath
    }/${collectionName.toLowerCase()}.txt`;
    //CollectionPath is './database/users.txt'
    return fs
      .readFile(collectionPath)
      .then((data) => {
        // const parsedData = JSON.parse(data) || [];
        console.log(data);
        const parsedData = (!!data) ? JSON.parse(data) : [];
        return parsedData;
      })
      .catch((err) => {
        handleError(
          err,
          "datasources/file-system.datasource.js",
          "readCollection"
        );
        return [];
      });
  };

  this.updateCollection = function updateCollection(
    collectionName = "",
    newData
  ) {
    const collectionPath = `${
      this.databasePath
    }/${collectionName.toLowerCase()}.txt`;
    return fs.writeFile(collectionPath, JSON.stringify(newData)).catch(() => {
      return fs
        .mkdir(database)
        .then(() => fs.writeFile(this.databasePath, JSON.stringify(newData)))
        .catch((err) => {
          handleError(
            err,
            "datasources/file-system.datasource.js",
            "updateCollection"
          );
        });
    });
  };
}

module.exports = FileSystemDataSource;
