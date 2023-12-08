const express = require('express');
const accountRouter = express.Router();
const AccountController = require('../controllers/account.controller') //cấu trúc chưa sd trực tiếp được => phải khai báo ở dòng bên dưới
const Controller = new AccountController()


// accountRouter.get('/account', async function (req, res) {
//     const account = Controller.getAccount() // phương thức này trả dữ liệu về cho biến account
//     res.status(200).json(account) // trả dữ liệu và trạng thái cho response
// })

accountRouter.get('/all-accounts', async function (req, res) {
    const accounts = Controller.getAllAccounts()
    res.status.json(200).json(accounts) 
    return ('Congrats')
})



module.exports = accountRouter;