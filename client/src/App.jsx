import { Routes , Route } from 'react-router-dom'
import TasksPage from './pages/TasksPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<TasksPage />} />
    </Routes>
  )
}

export default App
