import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registers from "./pages/Registers";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

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
