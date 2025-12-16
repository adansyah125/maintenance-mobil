import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Pages/Dashboard";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Login */}
        <Route path="/" element={
          <Login />
          } />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <Dashboard initialMenuId="beranda" />
          }
        />
        {/* LAYANAN */}
        <Route
          path="/layanan"
          element={
            <Dashboard initialMenuId="layanan" />
          }
        />
        {/* DATA KENDARAAN */}
        <Route
          path="/kendaraan"
          element={
            <Dashboard initialMenuId="kendaraan" />
          }
        />
        {/* SERVIS KENDARAAN */}
        <Route
          path="/servis"
          element={
            <Dashboard initialMenuId="servis" />
          }
        />
        {/* RIWAYAT SERVIS */}
        <Route
          path="/servis/riwayat"
          element={
            <Dashboard initialMenuId="riwayat" />
          }
        />
        {/* LAPORAN */}
        <Route
          path="/laporan"
          element={
            <Dashboard initialMenuId="laporan" />
          }
        />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
