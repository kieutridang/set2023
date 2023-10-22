const project = {
   
    projectName: {
        type: 'string',
        required: true,
        unique: true
    },
    owner: {
        type: 'number',
        required: true
    },
    tasks: {
        type: 'array',
        required: true
    },
    description: {
        type: 'string',
        required: false
    },

    dateCreated: {
        type: 'date',
        required: false
    },

module.exports = project
}