import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import DiseaseDetection from './pages/DiseaseDetection';
import Environment from './pages/Environment';

export default function App() {
  return <AppLayout><Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/disease-detection" element={<DiseaseDetection />} />
    <Route path="/environment" element={<Environment />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes></AppLayout>;
}
