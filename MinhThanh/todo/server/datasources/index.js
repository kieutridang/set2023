const FileSystemDataSource = require("./fileSystem");

const database = "./database";

const DBCollections = {
  user: "users",
  task: "tasks",
  project: "projects",
};

const fileSystemDataSource = new FileSystemDataSource(database);
// Example: const fileSystemDataSource = new FileSystemDataSource('./database');

module.exports = { DBCollections, fileSystemDataSource };
