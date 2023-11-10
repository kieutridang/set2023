const user = {
    id: {
        type: 'number',
        required: true
    },
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    }
}

// Validate Schema of User: chứa thông tin quy định các field của User (tên field, loại data, required or not, dư/thiếu field, ...)

module.exports = user