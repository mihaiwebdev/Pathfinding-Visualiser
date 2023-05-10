import PathfindingVisualizer from './components/PathfindingVisualizer'
import { PathfindProvider } from './context/PathfindContext'
import { VisualizeProvider } from './context/VisualizeContext'
import './App.css'

function App() {
  

  return (
    <div className='app'>
      <PathfindProvider>
        <VisualizeProvider>

        <PathfindingVisualizer/>
        
        </VisualizeProvider>
      </PathfindProvider>
    </div>
  )
}

export default App
