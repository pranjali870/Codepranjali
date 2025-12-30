import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registers from "../src/pages/Login";
import Login from "../src/pages/Registers";
import Tasks from "../src/pages/Tasks";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
