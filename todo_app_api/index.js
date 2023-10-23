const http = require("http");
const router = require("./router");

// const task_api_process = require("./task_api.js");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((request, respone) => {
    const controller = router.route(request);
    controller(request, respone);
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});



// function requestListener(req, res) {
//     const url = req.url;

//     try {
//         const methodType = req.method.toUpperCase();
//         task_api_process(methodType, url, req, res);

//         // switch (methodType) {
//         //     case "POST":
//         //         getRequestReturnRespone(req, res, postMethodHandler);
//         //         break;
//         //     case "GET":
//         //         getMethodHandler(url, req, res);
//         //         break;
//         //     case "PUT":
//         //         getRequestReturnRespone(req, res, putMethodHandler);
//         //         break;
//         //     case "DELETE":
//         //         deleteMethodHandler(url, req, res);
//         //         break;
//         //     default:
//         //         break;
//         // }
//     } catch (error) {
//         res.writeHead(400);
//         res.end(error.message);
//     }
// }

// const server = http.createServer(requestListener);
// server.listen(port, hostname, () =>{
//     console.log(`Server is running at http://${hostname}:${port}/`);
// });
