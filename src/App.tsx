import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { HomePage } from './pages/HomePage'
import { PhilosophyPage } from './pages/PhilosophyPage'
import { TransformationsPage } from './pages/TransformationsPage'
import { CoachingPage } from './pages/CoachingPage'
import { ApplyPage } from './pages/ApplyPage'
import { ToolsPage } from './pages/ToolsPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="/transformations" element={<TransformationsPage />} />
          <Route path="/coaching" element={<CoachingPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
