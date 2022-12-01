// Typescript From Json
const path = require("path")
const fs = require("fs")

const lineEndpoints = require("./line-endpoints")

main()

function main() {
    const diagonalLineGrid = JSON.parse(
        fs.readFileSync(path.join(__dirname, "example-d.json"))
    )
    const horizontalLineGrid = JSON.parse(
        fs.readFileSync(path.join(__dirname, "example-h.json"))
    )
    const verticalLineGrid = JSON.parse(
        fs.readFileSync(path.join(__dirname, "example-v.json"))
    )

    console.log("diagonal: ", lineEndpoints(diagonalLineGrid))
    console.log("horizontal: ", lineEndpoints(horizontalLineGrid))
    console.log("vertical: ", lineEndpoints(verticalLineGrid))
}
