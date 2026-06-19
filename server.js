// -*- compile-command: "node server.js" -*-
const { readFile, writeFile } = require('node:fs/promises');
const http = require("node:http")

function readScoreBoard() {
    return readFile('./storage.txt', 'utf8')
	.then((data) => {
	    const board = [];
	    const lines = data.trim().split("\n");
	    for (let i = 0; i < lines.length; i++) {
		const [name, score] = lines[i].split(":")
		board.push({ name, score });
	    }
	    return board;
	})
}

function updateUserScore(name, score) {
    readScoreBoard().then((board) => {
	let founded = true;
	for(let i = 0; i < board.length; i++) {
	    if (name !== board[i].name){
		continue
	    }
	    if (score <= board[i].score){
		return
	    }
	    board[i].score = score;
	    founded = false;
	}
	if(founded){
	    board.push({name, score});   
	}
	
	writeScoreBoard(board);
    })
}

function writeScoreBoard(board) {
    let lines = [];
    for (const row of board) {
	lines.push(`${row.name}:${row.score}`);
    }    
    return writeFile('./storage.txt', lines.join("\n") , 'utf8')
}


function renderScoreBoard(board) {
    let scoreBoardHtml = `
<table>
  <tr>
    <th>Name</th>
    <th>Score</th>
  </tr>
`
    for (const entry of board) {
	scoreBoardHtml += `<tr>
<td>${entry.name}</td>
<td>${entry.score}</td>
</tr>
`
    }
    scoreBoardHtml += `</table>`
    return scoreBoardHtml
}

function handleGetIndex(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
    readFile('./index.html', 'utf8')
	.then(html => {
	    res.end(html)
	})	
}

function handleGetScoreBoard(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
    readScoreBoard()
	.then((board) => res.end(renderScoreBoard(board)))	
}

function handleGetRegister(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end("helloworld!")
}

http
    .createServer((req, res) => {
	const router = {
	    "/": handleGetIndex,
	    "/score-board": handleGetScoreBoard,
	    "/register": handleGetRegister,
	}
	const handler = router[req.url]
	if (handler == null) {
	    res.writeHead(404, { "Content-Type": "text/plain" })
	    res.end(`Route ${req.url} not found`)
	    return
	}
	handler(req, res)
    })
    .listen(8080)

console.log("running")
