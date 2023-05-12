// Typescript From Json
const path = require("path")
const fs = require("fs")

const tsFromJS = require("./ts-from-json")

main()

function main() {
    const jsonString = fs.readFileSync(path.join(__dirname, "example.json"))
    try {
        const json = JSON.parse(jsonString)
        const output = tsFromJS(json)
        console.log(output)
        fs.writeFileSync(path.join(__dirname, "output.ts"), output)
    } catch (e) {
        console.error(e)
        console.log("Invalid JSON")
    }
}
