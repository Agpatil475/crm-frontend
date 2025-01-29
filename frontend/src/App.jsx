import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import Register from './pages/Register';
import OtpLogin from './pages/OtpLogin';
import CampaignPage from './components/CampaignPage';
import LeadsPage from './components/LeadsPage';
import LogsPage from './components/LogsPage';
import ReportPage from './components/ReportPage';
import TaskPage from './components/TaskPage';
import WalkLeads from './components/WalkLeads';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otplogin" element={<OtpLogin />} />
        <Route path="/admin-dashboard/*" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        } />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/campaigns" element={<CampaignPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="/walk-in" element={<WalkLeads />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
