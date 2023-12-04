"use client";
import AddTask from "./_component/AddTask";
import TaskList from "./_component/TaskList";
import { useState, useEffect } from "react";


function Detail() {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    const [tasks, setTasks] = useState(data);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    return (
            <div className="px-6 mt-20">
                <h1 className="text-center text-xl font-bold text-gray-500 m-3 ">
                    Projects Detail
                </h1>
                <AddTask tasks={tasks} setTasks={setTasks} />
                {tasks.length ? (
                    <TaskList tasks={tasks} setTasks={setTasks} />
                ) : (
                    "Loading "
                )}
            </div>
    );
}

export default Detail;
