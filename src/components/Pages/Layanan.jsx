import React from "react";

const services = [
  {
    name: "Ganti Oli Mesin",
    price: "150.000",
    icon: "🛢️",
    desc: "Penggantian oli mesin dan pengecekan ringan",
    duration: "30 Menit",
  },
  {
    name: "Tune Up Mesin",
    price: "300.000",
    icon: "⚙️",
    desc: "Optimasi performa mesin kendaraan",
    duration: "60 Menit",
  },
  {
    name: "Servis Rem",
    price: "250.000",
    icon: "🛑",
    desc: "Pemeriksaan dan perbaikan sistem rem",
    duration: "45 Menit",
  },
  {
    name: "Spooring & Balancing",
    price: "400.000",
    icon: "🛞",
    desc: "Menjaga kestabilan dan kenyamanan mobil",
    duration: "90 Menit",
  },
  {
    name: "Ganti Aki",
    price: "500.000",
    icon: "🔋",
    desc: "Penggantian aki mobil dan pengecekan kelistrikan",
    duration: "30 Menit",
  },
  {
    name: "Servis AC Mobil",
    price: "350.000",
    icon: "❄️",
    desc: "Cek & perawatan sistem AC mobil",
    duration: "60 Menit",
  },
];

function Layanan() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Daftar Layanan Bengkel
        </h1>
        <p className="text-sm text-gray-500">
          Pilih layanan servis kendaraan sesuai kebutuhan Anda
        </p>
      </div>

      {/* CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl">
                {service.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {service.name}
                </h3>
                <p className="text-xs text-gray-500">
                  Estimasi: {service.duration}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {service.desc}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-indigo-600">
                Rp {service.price}
              </span>

              <button className="text-sm bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition">
                Booking
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* INFO */}
      <div className="mt-10 bg-indigo-50 border border-indigo-100 p-4 rounded-lg text-sm text-indigo-800">
        ℹ️ Harga dapat berubah sesuai kondisi kendaraan dan jenis layanan tambahan.
      </div>

    </div>
  );
}

export default Layanan;
