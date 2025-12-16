import { Route, Routes } from "react-router-dom"
import { Link } from "react-router-dom"
import Login from "./components/Login"
import DashboardContent from "./components/DashboardContent"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
        path="/dashboard" 
        element={
        <DashboardContent initialMenuId="dashboard" 
        />}  />
      </Routes>
    </>
  )
}

export default App
