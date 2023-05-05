const Node = (props) => {
    const {col, row, isStart, isFinish, isWall} = props

    const classNameAttr = isFinish ? 'node-finish' : isStart ? 'node-start'
        : isWall ? 'node-wall' : ''

    return (
        <div id={`node-${row}-${col}`}
         className={`node ${classNameAttr}`}
         ></div>
    )
}

export default Node
