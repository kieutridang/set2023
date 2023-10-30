const Task = require("../models/task");

async function addTask(req, res) {
    const {taskName, isCompleted} = req.body;

    if (!taskName) {
        return res.status(400).json({
            success: false,
            message: "task name is required"
        });
    }

    try {
        const newTask = new Task({
            taskName: taskName,
            isCompleted: isCompleted || false,
            owner: req.userId
        });

        await newTask.save();

        return res.status(200).json({
            success: true,
            message: "add task successfully"
        });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false, 
            message: "Internal server error" 
        });   
    }
}

async function getAllTask(req, res) {
    try {
        const task = await Task.find({owner: req.userId}).populate("owner", ["email"]);

        res.json({
            success: true,
            task
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false, 
            message: "Internal server error" 
        });  
    }
}

async function updateTask(req, res) {
    const {taskName, isCompleted} = req.body;

    console.log(taskName);

    if (!taskName) {
        return res.status(401).json({
            success: false,
            message: "Task name is required"
        });
    }

    try {
        let updatedTask = {
            taskName: taskName,
            isCompleted: isCompleted || false
        };

        const updateCondition = {_id: req.params.id, owner: req.userId};
    
        updateTask = await Task.findOneAndUpdate(updateCondition, updatedTask, {new: true});
    
        if (!updateTask) {
            return res.status(401).json({
                success: false,
                message: "Task not found or user not authorised"
            }); 
        }
    
        return res.status(200).json({
            success: true,
            message: "Task is updated successfully",
            infoTask: updatedTask
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false, 
            message: "Internal server error" 
        });
    }
}

async function deleteTask(req, res) {
    try {
        const deleteCondition = {_id: req.params.id, owner: req.userId};

        const deletedTask = await Task.findOneAndDelete(deleteCondition);

        if (!deletedTask) {
            return res.status(401).json({
                success: false,
                message: "Task not found or user not authorised"
            });
        }

        return res.status(200).json({
            success: true,
            message: `Task with id ${req.params.id} is deleted`
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false, 
            message: "Internal server error" 
        });
    }
}

async function deleteAllTask(req, res) {
    try {
        console.log(req.userId);
        const task = await Task.findByIdAndDelete("653df56e00526ad1b8d0a331");

        if (!task) {
            return res.status(401).json({
                success: false,
                message: "Task not found or user not authorised"
            });
        }

        return res.status(200).json({
            success: true,
            message: "All task are deleted"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, 
            message: "Internal server error" 
        });
    }
}

module.exports = {addTask, getAllTask, updateTask, deleteTask, deleteAllTask};