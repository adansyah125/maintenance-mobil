import React, { useState } from "react";

function DataKendaraan() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plat: "D 1234 AB",
      pemilik: "Ahmad Fauzi",
      merk: "Toyota",
      model: "Avanza",
      tahun: 2020,
    },
    {
      id: 2,
      plat: "B 9876 CD",
      pemilik: "Siti Aminah",
      merk: "Honda",
      model: "Brio",
      tahun: 2019,
    },
  ]);

  const [form, setForm] = useState({
    plat: "",
    pemilik: "",
    merk: "",
    model: "",
    tahun: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.plat || !form.pemilik) return;

    setVehicles([
      ...vehicles,
      { id: Date.now(), ...form },
    ]);

    setForm({
      plat: "",
      pemilik: "",
      merk: "",
      model: "",
      tahun: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Data Kendaraan Pelanggan
        </h1>
        <p className="text-sm text-gray-500">
          Kelola data kendaraan yang terdaftar di bengkel
        </p>
      </div>

      {/* FORM TAMBAH KENDARAAN */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          ➕ Tambah Kendaraan
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            type="text"
            name="plat"
            value={form.plat}
            onChange={handleChange}
            placeholder="No Polisi (D 1234 AB)"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="text"
            name="pemilik"
            value={form.pemilik}
            onChange={handleChange}
            placeholder="Nama Pemilik"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="text"
            name="merk"
            value={form.merk}
            onChange={handleChange}
            placeholder="Merk (Toyota, Honda)"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="text"
            name="model"
            value={form.model}
            onChange={handleChange}
            placeholder="Model (Avanza, Brio)"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="number"
            name="tahun"
            value={form.tahun}
            onChange={handleChange}
            placeholder="Tahun"
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition"
          >
            Simpan
          </button>
        </form>
      </div>

      {/* LIST KENDARAAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <div
            key={v.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🚗</span>
              <h3 className="font-semibold text-gray-800">
                {v.plat}
              </h3>
            </div>

            <p className="text-sm text-gray-600">
              <strong>Pemilik:</strong> {v.pemilik}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Kendaraan:</strong> {v.merk} {v.model}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Tahun:</strong> {v.tahun}
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">
                Detail
              </button>
              <button className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default DataKendaraan;
