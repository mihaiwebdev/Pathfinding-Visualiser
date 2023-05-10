import {useEffect, useState, createContext, useRef } from 'react'

const PathfindContext = createContext()

export const PathfindProvider = ({children}) => {
    const [startNodeRow, setStartNodeRow] = useState(10);
    const [startNodeCol, setStartNodeCol] = useState(10);
    const [finishNodeRow, setFinishNodeRow] = useState(40);
    const [finishNodeCol, setFinishNodeCol] = useState(5);   
  
    const [grid, setGrid] = useState([])
    const [nodeElements, setNodeElements] = useState()
    const [startNodeEl, setStartNodeEl] = useState('')
    const [finishNodeEl, setFinishNodeEl] = useState('')
    const draggedElRef = useRef(null)
     
    // Create the grid 
    const createGrid = () => {
        for (let row = 0; row < 65; row++) {
            const currentRow = [];

            for (let col = 0; col < 25; col++) {
                currentRow.push(createNode(col, row));
            }
            
            setGrid(state => [...state, currentRow])
        }
    }

    // Create Node Object
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

    // Clear the board
    const resetBoard = () => {
        nodeElements.forEach(node => {
            node.classList.remove('node-visited');
            node.classList.remove('path')
        })
        
    }

    // Reset node object properties
    const resetNodes = (el) => {
        grid.map(row => row.map(node => {
            if (el === 'startNode') {
                node.isStart = false
            }
            if (el === 'finishNode') {
                node.isFinish = false
            }
            node.distance = Infinity
            node.isVisited = false
            node.previousNode = null
            node.isWall = false
        }))
    }

    // Create Grid Layout
    useEffect(() => {
        createGrid();
    }, [])

    // Store all nodes, finish node and start node
    useEffect(() => {
        if (document.querySelector('.node-finish')) {
            setFinishNodeEl(document.querySelector('.node-finish'))
        } 
        if (document.querySelector('.node-start')) {
            setStartNodeEl(document.querySelector('.node-start'))
        }
        if (document.querySelectorAll('.node')) {
            setNodeElements(document.querySelectorAll('.node'))   
        }
    
    }, [grid])
    
    // Add events and logic for Dragging
    useEffect(() => {
        const handleDragStart = (e) => {
            resetBoard();
            draggedElRef.current = e.target.className;
        }

        const handleDragEnd = (e) => {
            e.target.className = 'node'
            e.target.draggable = 'false'
        }

        if (finishNodeEl && startNodeEl) {
            finishNodeEl.addEventListener("dragstart", handleDragStart)
            finishNodeEl.addEventListener("dragend", handleDragEnd)
            startNodeEl.addEventListener("dragstart", handleDragStart)
            startNodeEl.addEventListener("dragend", handleDragEnd)
        }

        return () => {
            if (finishNodeEl && startNodeEl) {
              finishNodeEl.removeEventListener('dragstart', handleDragStart);
              startNodeEl.removeEventListener('dragstart', handleDragStart);
            }
          };
    
    }, [finishNodeEl, startNodeEl])

    // Add events and logic for Dropping
    useEffect(() => {
        const handleDrop = (e) => {
            e.preventDefault();
            e.target.className = draggedElRef.current;
            e.target.draggable= 'true'

            const nodeID = e.target.id.split('-')

            if (e.target.classList.contains('node-start')) {
                setStartNodeEl(e.target)
                setStartNodeRow(+nodeID[1])
                setStartNodeCol(+nodeID[2])
                resetNodes('startNode')

            } else if (e.target.classList.contains('node-finish')) {
                setFinishNodeEl(e.target)
                setFinishNodeRow(+nodeID[1])
                setFinishNodeCol(+nodeID[2])
                resetNodes('finishNode')
            }
        }
        
        if (nodeElements) {
            nodeElements.forEach(nodeEl => { 
                nodeEl.addEventListener("dragover", (e) => {
                    e.preventDefault();
                })
    
                nodeEl.addEventListener("dragenter", (e) => {
                    e.target.classList.add('dragenter-node')
                })
    
                nodeEl.addEventListener("dragleave", (e) => {
                    e.target.classList.remove('dragenter-node')
                })
    
                nodeEl.addEventListener("drop", handleDrop)
            }) 
        }

    },[nodeElements])


    return <PathfindContext.Provider value={{
        startNodeRow, startNodeCol, startNodeEl,
        finishNodeRow, finishNodeCol, finishNodeEl,
        grid

    }}>
        {children}
    </PathfindContext.Provider>
    
}

export default PathfindContext


