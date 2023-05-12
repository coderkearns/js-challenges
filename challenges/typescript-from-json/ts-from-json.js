module.exports = function tsFromJS(json) {
    const objects = []
    objects.index = 1
    objects.map = {}

    const ast = jsonToAst(json, objects)
    objects.map[`JSONRoot`] = ast

    const string = objectsToString(objects.map)
    return string
}

function jsonToAst(json, objects, indent = 1) {
    if (typeof json === "object") {
        if (Array.isArray(json)) {
            if (json.length === 0) {
                const item = {
                    type: "generic", name: "Array", args: [{
                        type: "literal",
                        name: "unknown",
                    }]
                }
                return handleItem(item, objects)
            } else {
                const item = { type: "generic", name: "Array", args: [jsonToAst(json[0], objects, indent)] }
                if (json.length > 1) handleItem(item, objects)
                return handleItem(item, objects)
            }
        } else {
            const item = { indent, type: "object", items: Object.entries(json).map(([key, value]) => ({ key, value: jsonToAst(value, objects, indent + 1) })) }
            return handleItem(item, objects)
        }
    }

    return {
        type: "literal",
        name: typeof json
    }
}

function areObjectsEqual(a, b) {
    if (typeof a !== typeof b) return false
    if (typeof a !== "object") return a === b
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false
        for (let i = 0; i < a.length; i++) {
            if (!areObjectsEqual(a[i], b[i])) return false
        }
        return true
    } else {
        return Object.entries(a).every(([key, value]) => areObjectsEqual(value, b[key]))
    }
}

function handleItem(item, objects) {
    if (!objects.find(o => areObjectsEqual(o, item))) {
        objects.push(item)
        return item
    }

    const pair = Object.entries(objects.map).find(([key, value]) => areObjectsEqual(value, item))

    // check it it has a key in objects.map
    if (pair) {
        return item
    }

    const name = `T${objects.index++}`
    objects.map[name] = item

    return item
}

function objectsToString(objects) {
    objects = Object.fromEntries(Object.entries(objects).map(([key, value]) => ([key, astToString(value)])))
    for (let key in objects) {
        const object = objects[key]
        const others = Object.fromEntries(Object.entries(objects).filter(([k, v]) => k !== key))
        for (other in others) {
            objects[other] = others[other].replaceAll(object, key)
        }
    }
    return Object.entries(objects).map(([key, value]) => `type ${key} = ${value};`).join("\n\n")
}

const types = {
    literal: (ast) => ast.name,
    tuple: (ast) => `[${ast.items.map(child => astToString(child)).join(", ")}]`,
    generic: (ast) => `${ast.name}<${ast.args.map(child => astToString(child)).join(", ")}>`,
    keyValuePair: (ast) => `${ast.key}: ${astToString(ast.value)}`,
    function: (ast) => `(${ast.args.map(child => types.keyValuePair(child)).join(", ")}) => ${astToString(ast.return)}`,
    object: (ast) => `{\n${ast.items.map(child => "\t".repeat(ast.indent) + types.keyValuePair(child)).join(",\n")}\n${"\t".repeat((ast.indent || 1) - 1)}}`,
}

function astToString(ast) {
    return types[ast.type](ast)
}
