const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName: {
        type: String,
        required: true,
        unique: true,
    },

    isCompleted: {
        type: Boolean,
        required: false 
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

module.exports = mongoose.model("tasks", taskSchema);