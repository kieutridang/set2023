const { DBCollections, fileSystemDataSource } = require("../datasources");
const {
  validateEntityFields,
  validateEntityUniqueness,
} = require("./validateField");
const { handleError } = require("../helpers");

class Repository {
  constructor(name, schema) {
    this.schema = schema;
    this.find = function find() {
      return (
        fileSystemDataSource
          .readCollection(DBCollections[name])
          // return fileSystemDataSource.readCollection(DBCollections[user]) = fileSystemDataSource.readCollection('users')
          .then((data) => {
            return data;
          })
          .catch((err) => {
            handleError(err, "repositories/baseRepository.js", "find");
            return [];
          })
      );
    };

    // this.filterById = function findById(id) {
    //     return fileSystemDataSource.readCollection(DBCollections[name])
    //         .then(data => {
    //             const foundEntity = data.filter(entity => entity.owner == id)
    //             return foundEntity
    //         })
    //         .catch(err => {
    //             handleError(err, 'repositories/base.repository.js', 'findById')
    //             return undefined
    //         })
    // }
    this.findById = function findById(id) {
      return fileSystemDataSource
        .readCollection(DBCollections[name])
        .then((data) => {
          const foundEntity = data.find((entity) => entity.id === id);
          return foundEntity;
        })
        .catch((err) => {
          handleError(err, "repositories/base.repository.js", "findById");
          return undefined;
        });
    };
    this.createOne = function createOne(newItem) {
      return new Promise((resolve, reject) => {
        let validationError = validateEntityFields(this.schema, newItem);
        if (validationError) {
          reject(validationError);
        } else {
          resolve(
            this.find().then((existingItems) => {
              validationError = validateEntityUniqueness(
                this.schema,
                newItem,
                existingItems
              );
              if (validationError) {
                throw new Error(validationError);
              }

              existingItems.push(newItem);
              return fileSystemDataSource
                .updateCollection(DBCollections[name], existingItems)
                .then(() => newItem)
                .catch((err) => {
                  handleError(
                    err,
                    "repositories/baseRepository.js",
                    "createOne"
                  );
                });
            })
          );
        }
      });
    };
    this.updateOne = function updateOne(newItem) {
      return new Promise((resolve, reject) => {
        let validationError = validateEntityFields(this.schema, newItem);
        if (validationError) {
          reject(validationError);
        } else {
          resolve(
            this.find().then((existingItems) => {
              validationError = "";
              if (validationError) {
                throw new Error(validationError);
              }

              const foundIndex = existingItems.findIndex(
                (element) => element.id === newItem.id
              );

              existingItems.splice(foundIndex, 1, newItem);

              return fileSystemDataSource
                .updateCollection(DBCollections[name], existingItems)
                .catch((err) => {
                  handleError(
                    err,
                    "repositories/base.repository.js",
                    "updateOne"
                  );
                });
            })
          );
        }
      });
    };
    this.deleteById = function removeOne(id) {
      return new Promise((resolve, reject) => {
        resolve(
          this.find().then((existingItems) => {
            validationError = "";
            if (validationError) {
              throw new Error(validationError);
            }
            existingItems = existingItems.filter((item) => item.id != id);
            return fileSystemDataSource
              .updateCollection(DBCollections[name], existingItems)
              .catch((err) => {
                handleError(
                  err,
                  "repositories/base.repository.js",
                  "deleteById"
                );
              });
          })
        );
      });
    };
  }
}

module.exports = Repository;
