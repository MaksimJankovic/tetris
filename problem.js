const input = "foo=bar; something=else; whatever=catb"
const output = "else"

// foo=bar; something=else; whatever=cat
// {"foo":"bar", "something":"else", "whatever":"cat"}
// {foo:bar, something:else, whatever:cat}

function findOutput(input) {
    input = `{"${input}"}`
    input = input.replaceAll(`=`, `": "`).replaceAll(`; `, `", "`)
    input = JSON.parse(input);
    return input.something
}

console.log("solved:", findOutput(input) === output)
