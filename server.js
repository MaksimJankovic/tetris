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
        readScoreBoard()
http
    .createServer((req, res) => {
	console.log("we got a request", "request", req, "response", res)
	res.writeHead(200, { "Content-Type": "text/html" })
	const html = renderScoreBoard()
	res.end(html)
	    console.log(html);
    })
//    .listen(8080)

updateUserScore("maksim", 2000)
