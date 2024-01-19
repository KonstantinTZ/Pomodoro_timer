

export function idGenerator() {
    let id =  Math.random().toString(16).slice(2)
    let stringifyedId = JSON.stringify(id)
    return stringifyedId
}