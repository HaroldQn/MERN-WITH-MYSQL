import { Routes , Route } from 'react-router-dom'
import TasksPage from './pages/TasksPage'
import TasksForm from './pages/TasksForm'
import NotFound from './pages/NotFound'
import {TaskContextProvider} from './context/TaskProvider'

import Navbar from './components/Navbar'

function App() {
  return (
    <TaskContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/new" element={<TasksForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TaskContextProvider>
  )
}

export default App
