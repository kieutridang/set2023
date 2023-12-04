import Task from "./Task";
function TaskList({ tasks, setTasks }) {
    const handleChange = (_task) => {
        setTasks(
            tasks.map((task) => {
                if (task.id == _task.id) {
                    return _task;
                }
                return task;
            })
        );
    };
    function removeTask(id) {
        setTasks(tasks.filter((task) => task.id != id));
    }
    return (
        <div className="relative overflow-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Task name
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            State
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Author
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <Task
                        index={index}
                            task={task}
                            key={index}
                            handleChange={handleChange}
                            removeTask={removeTask}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;
