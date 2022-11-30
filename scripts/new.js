const path = require("path")
const fs = require("fs")

const args = process.argv.slice(2)

if (args.length !== 1) {
    console.log("Usage: (npm run) new <location>")
    console.log("Example: npm run new typescript-generator")
    process.exit()
}

const location = path.join(__dirname, "..", "challenges", args[0])
const title = titleify(args[0])

makeDirIfNotExists(location)

makeFileIfNotExists(
    path.join(location, "README.md"),
    `# ${title}\n\n{description}\n`
)

makeFileIfNotExists(
    path.join(location, "index.js"),
    `// ${title}\n\nmain()\n\nfunction main() {}\n`
)

/* Utility Functions */
function makeDirIfNotExists(dir) {
    if (fs.existsSync(dir)) return

    fs.mkdirSync(dir)
    console.log(`Created directory ${dir}`)
}

function makeFileIfNotExists(file, content = "") {
    if (fs.existsSync(file)) return

    fs.writeFileSync(file, content)
    console.log(`Created file ${file}`)
}

function titleify(path) {
    return path
        .split("-")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ")
}
