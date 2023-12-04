import { useState } from "react";

function Task({ task, index, handleChange, removeTask }) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState("");
    const [done, setDone] = useState(task.done);
    function handleSaveChange() {
        const taskEdited = {
            ...task,
            title: text,
        };
        handleChange(taskEdited);
        setText("");
        setEditing(false);
    }
    function handleToggleDone() {
        const newTask = {
            ...task,
            done: !done,
        };
        handleChange(newTask);
        setDone(!done);
    }
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 text-center">
                {index}
            </td>
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {editing ? (
                    <input
                        className="w-full border-none outline-none text-gray-900 text-sm rounded-lg block bg-transparent dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        onKeyDown={(event) => {
                            if (event.key == "Enter") {
                                handleSaveChange();
                            }
                        }}
                    />
                ) : (
                    task.title
                )}
            </th>
            <td className="px-6 py-4 text-center">
                {done ? "Done" : "In progress"}
            </td>
            <td className="px-6 py-4 text-center">Minh Thanh</td>
            <td className="px-6 py-4 text-center select-none">
                <span
                    onClick={() => handleToggleDone()}
                    className="font-medium text-blue-600 dark:text-green-500 hover:underline"
                >
                    Done
                </span>
                {editing ? (
                    <span
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline ms-3"
                        onClick={() => {
                            handleSaveChange();
                        }}
                    >
                        Save
                    </span>
                ) : (
                    <span
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline ms-3"
                        onClick={() => {
                            setText(task.title);
                            setEditing(true);
                        }}
                    >
                        Edit
                    </span>
                )}
                <span
                    onClick={() => removeTask(task.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3 select-none"
                >
                    Remove
                </span>
            </td>
        </tr>
    );
}

export default Task;
