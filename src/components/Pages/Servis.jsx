import React, { useState } from "react";

function Servis() {
  // Mock data kendaraan pelanggan
  const vehicles = [
    {
      id: 1,
      plat: "D 1234 AB",
      name: "Toyota Avanza 2020",
    },
    {
      id: 2,
      plat: "B 9876 CD",
      name: "Honda Brio 2019",
    },
  ];

  // Mock data layanan servis
  const services = [
    { id: 1, name: "Ganti Oli Mesin", price: 150000 },
    { id: 2, name: "Tune Up Mesin", price: 300000 },
    { id: 3, name: "Servis Rem", price: 250000 },
    { id: 4, name: "Spooring & Balancing", price: 400000 },
  ];

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [catatan, setCatatan] = useState("");

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const totalHarga = selectedServices.reduce(
    (total, s) => total + s.price,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      vehicle_id: selectedVehicle,
      services: selectedServices,
      tanggal,
      catatan,
      total: totalHarga,
    };

    console.log("Data Servis:", payload);
    alert("Booking servis berhasil!");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Booking Servis Kendaraan
        </h1>
        <p className="text-sm text-gray-500">
          Pilih kendaraan dan layanan servis yang dibutuhkan
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-full"
      >

        {/* PILIH KENDARAAN */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Pilih Kendaraan
          </label>
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          >
            <option value="">-- Pilih Kendaraan --</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.plat} - {v.name}
              </option>
            ))}
          </select>
        </div>

        {/* PILIH LAYANAN */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Pilih Layanan Servis
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => {
              const active = selectedServices.includes(service);
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service)}
                  className={`cursor-pointer border rounded-lg p-4 transition
                    ${
                      active
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-400"
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-800">
                      {service.name}
                    </h4>
                    <span className="text-sm font-bold text-indigo-600">
                      Rp {service.price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  {active && (
                    <p className="text-xs text-indigo-600 mt-2">
                      ✔ Dipilih
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* TANGGAL SERVIS */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tanggal Servis
          </label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* CATATAN */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Catatan Tambahan
          </label>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            rows="3"
            placeholder="Contoh: bunyi aneh di bagian mesin..."
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
        </div>

        {/* TOTAL */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="font-semibold text-gray-700">
            Estimasi Biaya
          </span>
          <span className="text-xl font-bold text-indigo-600">
            Rp {totalHarga.toLocaleString("id-ID")}
          </span>
        </div>

        {/* SUBMIT */}
        <div className="mt-6 text-right">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Booking Servis
          </button>
        </div>

      </form>
    </div>
  );
}

export default Servis;
