
const usersRouter = require('./usersRoute.js');

function route(app) {
    
    app.use('/user', usersRouter);
    
    app.get('/user', (req, res) => {
        res.render('Homepage');
    })
};