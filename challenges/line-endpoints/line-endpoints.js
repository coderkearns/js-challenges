module.exports = function lineEndpoints(grid) {
    let endpoint1 = null
    let endpoint2 = null

    for (let y in grid) {
        const row = grid[y]
        for (let x in row) {
            const point = row[x]
            if (point === 0) {
                // Point is black
                if (endpoint1 === null) {
                    endpoint1 = [x, y]
                } else {
                    endpoint2 = [x, y]
                }
            }
        }
    }

    return [endpoint1, endpoint2]
}
