const getAllNodes = (grid) => {
    const nodes = [];

    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }

    return nodes;
}

const sortNodesByDistance = (unvisitedNodes) => {
   return unvisitedNodes.sort((a, b) => a.distance - b.distance);
}

const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const {col, row} = node;

    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited);
}

const updateUnvisitedNeighbors = (node, grid) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)

    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

export const dijkstra = (grid, startNode, finishNode) => {
    
    const visitedNodes = [];
    const unvisitedNodes = getAllNodes(grid);
    startNode.distance = 0;
    
    while (unvisitedNodes.length !== 0) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
     
        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return visitedNodes;

        closestNode.isVisited = true;
        visitedNodes.push(closestNode);

        if (closestNode === finishNode) return visitedNodes;

        updateUnvisitedNeighbors(closestNode, grid);
    }
}

export const getShortestPath = (finishNode) => {
    let nodes = [];
    let currentNode = finishNode;

    while (currentNode !== null) {
        nodes.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    return nodes;
}