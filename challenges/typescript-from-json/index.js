// Typescript From Json
const path = require("path")
const fs = require("fs")

const tsFromJS = require("./ts-from-json")

const inputFile = process.argv[2]
const outputFile = process.argv[3] || "output.ts"

main()

function main() {
    const jsonString = fs.readFileSync(path.join(__dirname, inputFile))
    try {
        const json = JSON.parse(jsonString)
        const output = tsFromJS(json)
        console.log(output)
        fs.writeFileSync(path.join(__dirname, outputFile), output)
    } catch (e) {
        console.error(e)
        console.log("Invalid JSON")
    }
}
