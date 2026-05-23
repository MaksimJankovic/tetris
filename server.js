const fs = require(`fs`).promises
const http = require("node:http")


fs.readFile('./storage.txt', 'utf8')
    .then((data) => {
	console.log("[", data, "]")
	const board = [];
	const lines = data.split("\n");
	for (let i = 0; i < lines.length - 1; i++) {
	    console.log("line=", lines[i])
	    const [name, score] = lines[i].split(":")
	    board.push({ name: name, score: score });
	}
		
	// parse data to board
	console.log("board", board)
	const html = renderScoreBoard(board)
	console.log("html", html)

	let problem = "turning string to an object"
    })
    .catch((error) => {
	// This single catch handles errors from BOTH readFile and writeFile
	console.error('An error occurred during the file operations:', error.message);
    });

function renderScoreBoard(board) {
    let scoreBoardHtml = `
<table>
  <tr>
    <th>Name</th>
    <th>Score</th>
  </tr>
`
    for (const entry of board) {
	console.log("entry", entry)
	scoreBoardHtml += `<tr>
<td>${entry.name}</td>
<td>${entry.score}</td>
</tr>
`
    }
    scoreBoardHtml += `</table>`
    return scoreBoardHtml
}

http
    .createServer((req, res) => {
	console.log("we got a request", "request", req, "response", res)
	res.writeHead(200, { "Content-Type": "text/html" })
	const html = renderScoreBoard()
	res.end(html)
    })
//    .listen(8080)

console.log("we are up and running")
