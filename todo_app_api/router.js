const url = require("url");
const { handleNotFound, getTasks, addTask, editTask, deleteTask, signUp, signIn, pingWithAuth } = require('./controllers')
const {parseRequestBody} = require('./middlewares')
const {handleError} = require('./helpers')

const routes = {
    "/add-task": {
        POST : {
            controller: addTask,
            middlewares: [parseRequestBody],
        }
    },

    "/get-task": {
        GET: { 
            controller: getTasks,
            middlewares: [parseRequestBody],
        }
    },
};

function route(req) {
    const parsedUrl = url.parse(req.url, true);

    if (routes[parsedUrl.pathname] && routes[parsedUrl.pathname][req.method]) {
        const currentRouteData = routes[parsedUrl.pathname][req.method];

        if (currentRouteData.middlewares && currentRouteData.middlewares.length > 0) {
            return function controller(req, res) {
                try {
                    let promise = currentRouteData.middlewares[0](req, res);
                    currentRouteData.middlewares.forEach((middleware, index) => {
                        if (index > 0) {
                            promise.then(() => middleware(req, res));
                        }
                    });
                    promise.then(() => currentRouteData.controller(req, res));

                    return promise;
                } catch (error) {
                    //handleError(error, 'router.js', 'route() -> controller()');
                    res.statusCode = 500;
                    res.end();
                }
            }
        }

        return currentRouteData.controller;
    }

    return handleNotFound;
}

module.exports = {route};



