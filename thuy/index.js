const http = require('http');
const router = require('./router')

const port = 8080

const server = http.createServer((request, response) => {
    const controller = router.route(request)
    controller(request, response)
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
