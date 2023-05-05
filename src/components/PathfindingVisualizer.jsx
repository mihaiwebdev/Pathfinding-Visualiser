import { useEffect, useState } from "react";
import { dijkstra } from "../algorithms/dijkstra";
import Node from './Node'

const PathfindingVisualizer = () => {
    const startNodeRow = 10;
    const startNodeCol = 10;
    const finishNodeRow = 40;
    const finishNodeCol = 10;   
    const [grid, setGrid] = useState([])
    

    const createGrid = () => {
        for (let row = 0; row < 50; row++) {
            const currentRow = [];

            for (let col = 0; col < 20; col++) {
                currentRow.push(createNode(col, row));
            }
            
            setGrid(state => [...state, currentRow])
        }
    }

    const createNode = (col, row) => {
        return {
            col,
            row,
            isStart: row === startNodeRow && col === startNodeCol,
            isFinish: row === finishNodeRow && col === finishNodeCol,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
        }
    }

    useEffect(() => {
        createGrid();
    }, [])


    const animateDijkstra = (visitedNodes) => {
        for (let i = 0; i < visitedNodes.length; i++) {
            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`)
                    .className = 'node node-visited';
            }, 10 * i)
        }
    }

    const visualizeDijkstra = () => {
        const startNode = grid[startNodeRow][startNodeCol];
        const finishNode = grid[finishNodeRow][finishNodeCol];
        const visitedNodes = dijkstra(grid, startNode, finishNode);

        animateDijkstra(visitedNodes);
    }

    return (
        <div className="d-flex flex-column">
            <button onClick={() => visualizeDijkstra()}>Dijkstra's Algo</button>
            <div className="grid">
            
                {grid && grid.map((row, idx) => (
                    <div key={idx}>
                        {row.map((node, idx) => (
                            <Node 
                                key={idx}
                                col={node.col}
                                row={node.row}
                                isStart={node.isStart}
                                isFinish={node.isFinish}
                                isWall={node.isWall}
                            />
                        ))}
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default PathfindingVisualizer
