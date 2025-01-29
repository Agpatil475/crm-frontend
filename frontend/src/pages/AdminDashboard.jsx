import { useState } from "react";
import {  Routes, Route } from "react-router-dom";
import Topbar from "../../../dashboard/src/scenes/global/Topbar";
import Sidebar from "../../../dashboard/src/scenes/global/Sidebar";
import Dashboard from "../../../dashboard/src/scenes/dashboard";
import Team from "../../../dashboard/src/scenes/team";
import Invoices from "../../../dashboard/src/scenes/invoices";
import Contacts from "../../../dashboard/src/scenes/contacts";
import Bar from "../../../dashboard/src/scenes/bar";
import Form from "../../../dashboard/src/scenes/form";
import Line from "../../../dashboard/src/scenes/line";
import Pie from "../../../dashboard/src/scenes/pie";
import FAQ from "../../../dashboard/src/scenes/faq";
import Geography from "../../../dashboard/src/scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../dashboard/src/theme";
import Calendar from "../../../dashboard/src/scenes/calendar/calendar";
import Reports from "../../../dashboard/src/scenes/reports/reports";
import Integration from "../../../dashboard/src/scenes/integration/Integration";
import Settings from "../../../dashboard/src/scenes/pages/settings"; 
import PipelinePage from "../../../dashboard/src/scenes/pages/PipelinePage"; 
function AdminDashboard() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ display: 'flex', height: '100vh' }}>
          <Sidebar isSidebar={isSidebar} />
          <main className="content" style={{ flex: 1, padding: '1px', overflowY: 'auto' }}>
            <Topbar setIsSidebar={setIsSidebar} />
          
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/integration" element={<Integration />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/pipeline" element={<PipelinePage />} />
            </Routes>
            
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AdminDashboard;
//  import React from 'react';
//  import { useAuth } from '../context/authContext';

//  const AdminDashboard = () => {
//   const { user } = useAuth();
//   return (
//     <div>Admindashboard</div>
//   )
//  }

//  export default AdminDashboard;