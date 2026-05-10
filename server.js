const http = require("node:http")



const scoreBoard = [
    {name: "Maksim", score: 9999},
    {name: "Mark", score: 10},
    {name: "Andrey", score: 666},
]

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
	const html = renderScoreBoard(scoreBoard)
	res.end(html)
    })
    .listen(8080)

console.log("we are up and running")
