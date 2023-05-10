
const Node = (props) => {
    const { col, row, isStart, isFinish, isWall } = props

    const classNameAttr = isFinish ? 'node-finish' : isStart ? 'node-start'
        : isWall ? 'node-wall' : ''

    const draggable = isFinish || isStart ? true : false
    
  
    return (
        <div id={`node-${row}-${col}`} draggable={draggable}
         className={`node ${classNameAttr}`}
         ></div>
    )
}

export default Node
