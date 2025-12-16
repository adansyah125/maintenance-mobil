import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 md:px-4">
      <div className="flex w-full max-w-5xl bg-gray-800 rounded-xl overflow-hidden shadow-2xl">

        {/* LEFT - IMAGE COVER */}
        <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-zinc-600 to-gray-900">
          <div className="absolute inset-0 bg-[url('/car.png')] bg-cover bg-center opacity-50 animate-zoom"></div>

          <div className="relative z-10 flex flex-col justify-end p-10 text-white">
            <h2 className="text-3xl font-bold mb-3">
              Sistem Maintenance Mobil
            </h2>
            <p className="text-gray-300">
              Pantau servis, riwayat perawatan, dan estimasi biaya kendaraan Anda
              dengan mudah dan cepat.
            </p>
          </div>
        </div>

        {/* RIGHT - LOGIN FORM */}
        <div className="w-full md:w-1/2 p-8  md:p-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full text-white text-xl">
                🚗
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">
              Login Bengkel
            </h1>
            <p className="text-gray-400 text-sm">
              Masuk ke akun Anda
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Masukkan username"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Masukkan password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>

          {/* <div className="text-center mt-6 text-sm text-gray-400">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Daftar
            </Link>
          </div> */}
        </div>
      </div>

      {/* ANIMATION STYLE */}
      <style>
        {`
          @keyframes zoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
          }
          .animate-zoom {
            animation: zoom 12s ease-in-out infinite alternate;
          }
        `}
      </style>
    </div>
  );
}

export default Login;
