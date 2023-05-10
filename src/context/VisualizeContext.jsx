import { createContext, useContext, useState } from "react";
import { dijkstra, getShortestPath } from "../algorithms/dijkstra";
import PathfindContext from "../context/PathfindContext";

const VisualizeContext = createContext();

export const VisualizeProvider = ({children}) => {

    const { startNodeRow, startNodeCol, grid, finishNodeCol,
            finishNodeRow } = useContext(PathfindContext);  

    const [disable, setDisable] = useState(false)

    const animateShortestPath = (path) => {
       
        path.map((node,idx) => {
            const { row, col } = node;

            setTimeout(() => {
                document.getElementById(`node-${row}-${col}`).classList.add('path')

                if (idx === path.length - 1) {
                    setDisable(false)
                }
            }, 50 * idx)
        })
        return;
    }

    const animateDijkstra = (visitedNodes, path) => {
        
        for (let i = 0; i < visitedNodes.length; i++) {

            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`)
                    .classList.add('node-visited'); 

                if (i === visitedNodes.length - 1){
                    animateShortestPath(path)
                }
            }, 10 * i)
        }
        return;
    }

    const visualizeDijkstra = () => {
        const startNode = grid[startNodeRow][startNodeCol];
        const finishNode = grid[finishNodeRow][finishNodeCol];
        startNode.isStart = true;
        finishNode.isFinish = true;
        const visitedNodes = dijkstra(grid, startNode, finishNode);
        const path = getShortestPath(finishNode);

        setDisable(true)
        animateDijkstra(visitedNodes, path);
    }

    return <VisualizeContext.Provider value={{
        disable,
        visualizeDijkstra
    }}>
        {children}
    </VisualizeContext.Provider>
}

export default VisualizeContext