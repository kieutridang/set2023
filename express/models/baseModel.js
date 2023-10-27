const baseModel = {
    id: {
        type: "string",
        required: true,
        unique: true,
    },
    createdAt:{
        type: "string",
        required: true,
    },
    updatedAt:{
        type: "string",
        required: true,
    }

}
module.exports = baseModel