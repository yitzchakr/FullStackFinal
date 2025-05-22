import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingLayout from "./components/LandingPage/LandingLayout";
import Home from "./components/LandingPage/Home";
import IntakeForm from "./components/Intake/IntakeForm";
import Login from "./components/LandingPage/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home />} />
          <Route path="login/" element={<Login />} />
        </Route>
        <Route path="requests" element={<IntakeForm />} />
      </Routes>
    </>
  );
}

export default App;
