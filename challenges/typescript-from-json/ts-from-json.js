module.exports = function tsFromJS(json) {
    const objects = []
    objects.push(toType(json))

    let i = 0
    let ret = objects.map(o => `type T${i++} = ${typesToString(o)}`).join("\n")
    return ret
}

function toTypeObject(obj) {
    let typeObject = {}
    for (let key in obj) {
        typeObject[key] = toType(obj[key])
    }
    return typeObject
}

function toTypeArray(arr) {
    return arr.length === 0 ? ["unknown"] : [toType(arr[0])]
}
function toType(item) {
    if (typeof item === "object") {
        if (Array.isArray(item)) {
            return toTypeArray(item)
        } else {
            return toTypeObject(item)
        }
    } else {
        return typeof item
    }
}

function typesToString(typeObject) {
    if (typeof typeObject === "object") {
        if (Array.isArray(typeObject)) {
            return `Array<${typesToString(typeObject[0])}>`
        } else {
            return typeObjectToString(typeObject)
        }
    } else {
        return typeObject
    }
}

function typeObjectToString(obj) {
    return (
        "{" +
        Object.keys(obj)
            .map(key => `${key}: ${typesToString(obj[key])}`)
            .join("; ") +
        "}"
    )
}
