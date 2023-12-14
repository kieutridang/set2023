import { makeAutoObservable } from "mobx";

class ProjectsStore {
    projects = [
        {
            id: 1,
            name: "Do task 1",
            done: false,
            quantityOfTasks: 0,
            quantityOfMembers: 1,
            author: "MinhThanh",
        },
        {
            id: 2,
            name: "Do task 2",
            done: false,
            quantityOfTasks: 0,
            quantityOfMembers: 1,
            author: "MinhThanh",
        },
        {
            id: 3,
            name: "Do task 3",
            done: false,
            quantityOfTasks: 0,
            quantityOfMembers: 1,
            author: "MinhThanh",
        },
        {
            id: 4,
            name: "Do task 4",
            done: false,
            quantityOfTasks: 0,
            quantityOfMembers: 1,
            author: "MinhThanh",
        },
        {
            id: 5,
            name: "Do task 5",
            done: false,
            quantityOfTasks: 0,
            quantityOfMembers: 1,
            author: "MinhThanh",
        },
    ];

    constructor() {
        makeAutoObservable(this);
    }

    addProject(name) {
        this.projects.push({
            name,
            done: false,
            quantityOfTasks: 0,
            quantityOfMembers: 1,
            author: "MinhThanh",
        });
    }
}

export default new ProjectsStore();
