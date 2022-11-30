// Typescript From Json
const path = require("path")
const fs = require("fs")

const tsFromJS = require("./ts-from-json")

main()

function main() {
    const jsonString = fs.readFileSync(path.join(__dirname, "example.json"))
    try {
        const json = JSON.parse(jsonString)
        console.log(tsFromJS(json))
    } catch (e) {
        console.log("Invalid JSON")
    }
}
