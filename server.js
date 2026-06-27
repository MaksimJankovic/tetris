//reads scoreboard...
//writes scoreboard...
//returns game as well...
// Import the built-in HTTP module
const http = require('node:http');
const { readFile } = require('node:fs/promises');

const HOSTNAME = '127.0.0.1';
const PORT = 3000;



// Persistimg layer
function readScoreBoardFromFile() {
    return readFile('storage.json', 'utf8')
	.then((json) => {
	    return JSON.parse(json)
	})
}

function writeScoreBoardToFile(scoreBoard) {
    
}

// Business logic
function updateUserScoreIfNeeded(name, score) {
    
}

// web-layer
function handleIndex(req, res) {
    readFile('index.html', 'utf8')
    	.catch(err => {
	    console.error("failed to read index.html with", err)
	    res.writeHeader(500, { "Content-Type": "text/plain; charset=utf-8"})
	    res.end("life sucks: " + err) 
	})
	.then(html => {
	    res.writeHeader(200, { "Content-Type": "text/html; charset=utf-8"})
	    res.end(html)
	})
}

function handleScoreBoard(req, res) {
    readScoreBoardFromFile()
    	.catch((error) => {
	    console.error("failed to read scoreboard with", error)
	    res.writeHeader(500, {"Content-Type": "text/html; charset=utf-8"})
	    res.end("failed to read coreBoard")
	})
	.then(scoreBoard => {
	    console.log("scoreBoard", scoreBoard, "maksim's score", scoreBoard["maksim"])
	    res.writeHeader(200, { "Content-Type": "text/html; charset=utf-8"})
	    const html = [
		"<table>",
		"<tr><th>Name</th> <th>Score</th></tr>"

	    ]
	    for(const [key, value] of  Object.entries(scoreBoard)) {
		html.push(`<tr><th>${key}</th> <th>${value}</th></tr>`)
		console.log(key,value)
	    }
	    html.push("</table>")
	    console.log(html)
	    
	    res.end(html.join("\n"))
	    
	})
}

function handleRegister(req, res) {
    readFile('register.html', 'utf8')
	.catch(err => {
	    console.error("failed to read register.html with", err)
	    res.writeHeader(500, { "Content-Type": "text/plain; charset=utf-8"})
	    res.end("life maybe suck: " + err) 
	})
	.then(html => {
	    res.writeHeader(200, { "Content-Type": "text/html; charset=utf-8"})
	    res.end(html)
	})
}

const handleNotFound = (req, res) => {
    res.writeHeader(404, { "Content-Type": "text/html; charset=utf-8"})
    res.end(`<p>Route ${req.url} not found</p>`)
}

const router = {
    "/": handleIndex,
    "/score-board": handleScoreBoard,
    "/register": handleRegister,
}

// run the server
const server = http.createServer((req, res) => {
    let handler = router[req.url]
    if (handler == null) {
	handler = handleNotFound
    }
    handler(req, res)
    
    console.log("got request to url:", req.url, "response status", res.statusCode)
});

// Start the server on the specified port and hostname
server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
