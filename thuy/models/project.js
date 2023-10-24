const project = {
    projectName: {
        type: 'string',
        required: true,
        unique: true
    },
    owner: {
        type: 'number'
    },
    description: {
        type: 'string',
    },
    id: {
        type: 'number'
    }
}

module.exports = project