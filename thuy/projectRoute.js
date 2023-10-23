const url = require('url')
const { findProject, updateProject, removeProject } = require('./helpers')
const { handleError } = require('./helpers')


const routes = {
    '/find-project': { 'POST': { controller: findProject, middlewares: [parseRequestBody] } },
    '/update-project': { 'POST': { controller: updateProject, middlewares: [parseRequestBody] } },
    '/remove-project': { 'POST': { controller: removeProject, middlewares: [parseRequestBody] } },
}

function route(req) {
    const parsedUrl = url.parse(req.url, true)
    if (routes[parsedUrl.pathname] && routes[parsedUrl.pathname][req.method]) {
        const currentRouteData = routes[parsedUrl.pathname][req.method]
        if (currentRouteData.middlewares && currentRouteData.middlewares.length > 0) {
            return function controller(req, res) {
                try {
                    let promise = currentRouteData.middlewares[0](req, res)
                    currentRouteData.middlewares.forEach((middleware, index) => {
                            if (index > 0) {
                                promise.then(() => middleware(req, res))
                            }
                        })
                        // Call controller after all interceptor (middlewares)
                    promise.then(() => currentRouteData.controller(req, res))
                    return promise
                } catch (error) {
                    handleError(error, 'router.js', 'route() -> controller()')
                    res.statusCode = 500
                    res.end()
                }
            }
        }

        return currentRouteData.controller
    }

    return handleNotFound
}

module.exports = { route }