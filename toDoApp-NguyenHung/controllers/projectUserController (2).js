const { findProjectUsers, createProjectUser, findProjectUser, updateProjectUser, deleteProjectUser  } = require("./helper")

class projectUsersController {
    // getting all projectUSers
    async getProjectUsers() {
        return findProjectUsers();
    }

    // getting a single task
    async getProjectUser(id) {
        return findProjectUser(id);
    }

    // creating a projectUser
    async createProjectUser(projectUser) {
        return createProjectUser(projectUser);
    }

    // updating a projectUser
    async updateProjectUser(id,newProjectUser) {
        return updateProjectUser(id,newProjectUser)
    }

    // deleting a projectUser
    async deleteProjectUser(id) {
        return deleteProjectUser(id)
    }
}
module.exports = projectUsersController;