const { DBCollections, fileSystemDataSource } = require('../datasources')
const { validateEntityFields, validateEntityUniqueness } = require('./helpers')
const { handleError } = require('../helpers')

function Repository(name, schema) {
    this.schema = schema
    this.find = function find() {
        return fileSystemDataSource.readCollection(DBCollections[name])
            .then(data => {
                if (data && Array.isArray(data) && data.length > 0) {
                    const filteredData = data.filter(item =>
                        Object.keys(data).every(field => data[field] === item[field])
                    )
                    return filteredData
                }
                return data
            })
            .catch(err => {
                handleError(err, 'repositories/base.repository.js', 'find')
                return []
            })
    }

    this.filterById = function findById(id) {
        console.log("id input data", id);
        return fileSystemDataSource.readCollection(DBCollections[name])
            .then(data => {
                console.log("data from fileSystemDataSource", data);
                const foundEntity = data.filter(entity => entity.owner == id);
                console.log("foundEntity", foundEntity);
                return foundEntity
            })
            .catch(err => {
                handleError(err, 'repositories/base.repository.js', 'findById')
                return undefined
            })
    }

    this.findById = function findById(id) {
        return fileSystemDataSource.readCollection(DBCollections[name])
            .then(data => {
                const foundEntity = data.find(entity => entity.id === id)
                return foundEntity
            })
            .catch(err => {
                handleError(err, 'repositories/base.repository.js', 'findById')
                return undefined
            })
    }

    this.createOne = function createOne(newItem) {
        return new Promise((resolve, reject) => {
            let validationError = validateEntityFields(this.schema, newItem)
            if (validationError) {
                reject(validationError)
            } else {
                resolve(this.find().then(existingItems => {
                    validationError = validateEntityUniqueness(this.schema, newItem, existingItems)
                    if (validationError) {
                        
                        throw new Error(validationError)
                    }
                    
                    latestID = (existingItems.length > 0) ? Number(existingItems[existingItems.length - 1].id) + 1 : 0
                    
                    existingItems.push({
                        id: latestID,
                        ...newItem
                    })
                    return fileSystemDataSource.updateCollection(DBCollections[name], existingItems)
                        .catch(err => {
                            handleError(err, 'repositories/base.repository.js', 'createOne')
                        })
                }))
            }
        })
    }
    this.updateOne = function updateOne(newItem) {
        return new Promise((resolve, reject) => {
            let validationError = validateEntityFields(this.schema, newItem)
            if (validationError) {
                reject(validationError)
            } else {
                resolve(this.find().then(existingItems => {
                    validationError = ''
                    if (validationError) {
                        throw new Error(validationError)
                    }
                    existingItems.forEach(element => {
                        if (element.id == newItem.id)
                            element.taskName = newItem.taskName
                    });
                    return fileSystemDataSource.updateCollection(DBCollections[name], existingItems)
                        .catch(err => {
                            handleError(err, 'repositories/base.repository.js', 'updateOne')
                        })
                }))
            }
        })
    }
    this.removeOne = function removeOne(newItem) {
        return new Promise((resolve, reject) => {
            let validationError = validateEntityFields(this.schema, newItem)
            if (validationError) {
                reject(validationError)
            } else {
                resolve(this.find().then(existingItems => {
                    validationError = ''
                    if (validationError) {
                        throw new Error(validationError)
                    }
                    existingItems = existingItems.filter(item => item.id != newItem.id)
                    return fileSystemDataSource.updateCollection(DBCollections[name], existingItems)
                        .catch(err => {
                            handleError(err, 'repositories/base.repository.js', 'removeOne')
                        })
                }))
            }
        })
    }
}

module.exports = Repository

