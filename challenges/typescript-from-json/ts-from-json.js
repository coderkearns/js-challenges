module.exports = function tsFromJS(json) {
    const objects = []
    objects.index = 1
    objects.map = {}

    const ast = jsonToAst(json, objects)
    objects.map[`T${objects.index}`] = ast

    const string = objectsToString(objects.map)
    return string
}

function jsonToAst(json, objects) {
    if (typeof json === "object") {
        if (Array.isArray(json)) {
            const item = { type: "generic", name: "Array", args: json.map(child => jsonToAst(child, objects)) }
            return handleItem(item, objects)
        } else {
            const item = { type: "object", items: Object.entries(json).map(([key, value]) => ({ key, value: jsonToAst(value, objects) })) }
            return handleItem(item, objects)
        }
    }

    return {
        type: "literal",
        name: typeof json
    }
}

function handleItem(item, objects) {
    if (!objects.find(o => JSON.stringify(o) === JSON.stringify(item))) {
        objects.push(item)
        return item
    }

    const pair = Object.entries(objects.map).find(([key, value]) => JSON.stringify(value) === JSON.stringify(item))

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
    object: (ast) => `{\n${ast.items.map(child => "\t" + types.keyValuePair(child)).join(",\n")}\n}`,
}

function astToString(ast) {
    return types[ast.type](ast)
}
