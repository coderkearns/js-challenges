module.exports = function tsFromJS(json) {
    return generateObject(json)
}

function generateObject(obj) {
    return (
        "{ " +
        Object.keys(obj)
            .map(k => `${k}: ${typeOf(obj[k])}`)
            .join("; ") +
        " }"
    )
}

function typeOf(o) {
    if (typeof o === "object") {
        if (Array.isArray(o)) {
            if (o.length === 0) {
                return "Array<unknown>"
            } else {
                return `Array<${typeOf(o[0])}>`
            }
        } else {
            return generateObject(o)
        }
    }

    return typeof o
}
