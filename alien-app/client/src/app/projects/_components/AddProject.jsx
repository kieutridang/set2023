import { useState } from "react";

function AddProject({ projects, setProjects }) {
    const [name, setName] = useState("");

    function handleAddProject() {
        const newProject = {
            id: projects.length,
            name,
            quantityOfMembers: 1,
            quantityOfTasks: 0,
            done: false,
        };
        setProjects([...projects, newProject]);
        setName("");
        console.log("addTaskSuccess");
    }
    return (
        <div className=" flex justify-center m-5 gap-4">
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Enter project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => handleAddProject()}
            >
                Add Project
            </button>
        </div>
    );
}

export default AddProject;