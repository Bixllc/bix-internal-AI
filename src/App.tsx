import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { FindLeads } from './pages/FindLeads'
import { Pipeline } from './pages/Pipeline'
import { ProspectDetail } from './pages/ProspectDetail'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/find-leads" element={<FindLeads />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/prospect/:id" element={<ProspectDetail />} />
      </Route>
    </Routes>
  )
}
