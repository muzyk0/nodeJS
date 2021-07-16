const http = require("http");
const { addUser, getUsers } = require("./repository");
const { usersController } = require("./usersController");
const port = 3001;

process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p);
});

const cors = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return true;
    }
    return false;
};

const server = http.createServer((req, res) => {
    if (cors(req, res)) return;

    switch (req.url) {
        case "/users":
            usersController(req, res);
            break;
        case "/404":
            res.write("Page not found");
            break;
        default:
            res.write("");
            break;
    }
});

server.listen(port);
console.log(`Server started in port ${port}`);
