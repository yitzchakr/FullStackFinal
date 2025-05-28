import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingLayout from "./components/LandingPage/LandingLayout";
import Home from "./components/LandingPage/Home";
import IntakeForm from "./components/Intake/IntakeForm";
import Login from "./components/LandingPage/Login";
import DashBoard from "./components/Dashboards/DashBoard";
import { ProtectedRoute, RoleBasedRoute } from "./components/ProtectedRoute";
import CaseWorker from "./components/Dashboards/CaseWorker";
import Manager from "./components/Dashboards/Manager";
import { Admin } from "./components/Dashboards/Admin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
          <Route path="login/" element={<Login />} />
        </Route>
        <Route path="requests" element={<IntakeForm />} />
        
        {/* Protected Routes */}
        <Route  element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
            <Route element= {<RoleBasedRoute allowedRoles={['admin']} />}>
              <Route path = "/admin/*" element={<Admin/>}/>
            <Route/>
            <Route element= {<RoleBasedRoute allowedRoles={['manager']} />}>
              <Route path = "/manager/*" element={<Manager/>}/> 
            </Route>
            <Route element= {<RoleBasedRoute allowedRoles={['caseworker']} />}>
              <Route path = "/caseworker/*" element={<CaseWorker/>}/> 
            </Route>
            <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />  
          </Route>
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
