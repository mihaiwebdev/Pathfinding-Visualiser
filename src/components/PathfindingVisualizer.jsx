import { useContext } from 'react'
import PathfindContext from '../context/PathfindContext'
import VisualizeContext from '../context/VisualizeContext'
import Node from './Node'

const PathfindingVisualizer = () => {

    const { grid } = useContext(PathfindContext);
    const { disable, visualizeDijkstra } = useContext(VisualizeContext);

    return (
        <div className="d-flex flex-column">
            <button disabled={disable} id="dijkstra" onClick={() => visualizeDijkstra()}>Dijkstra's Algo</button>
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
