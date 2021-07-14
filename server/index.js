const http = require('http')
const port = 3001

const cors = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return true;
    }
    return false
}

const users = [{ id: 1, name: "Sasha" }, { id: 2, name: "Viktor" }]

const server = http.createServer((req, res) => {

    if (cors(req, res)) return

    switch (req.url) {
        case "/users":
            res.write(`${JSON.stringify(users)}`)
            break
        case "/404":
            res.write('Page not found')
            break
        default:
            res.write('')
            break
    }

    res.end()
})

server.listen(port);
console.log(`Server started in port ${port}`);