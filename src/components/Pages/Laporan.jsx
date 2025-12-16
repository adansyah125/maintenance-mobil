import React, { useState } from "react";

function Laporan() {
  const [filter, setFilter] = useState({
    dari: "",
    sampai: "",
  });

  const laporanServis = [
    {
      id: 1,
      tanggal: "2025-01-05",
      kendaraan: "D 1234 AB - Toyota Avanza",
      layanan: ["Ganti Oli", "Tune Up"],
      total: 450000,
      status: "selesai",
    },
    {
      id: 2,
      tanggal: "2025-01-10",
      kendaraan: "B 9876 CD - Honda Brio",
      layanan: ["Servis Rem"],
      total: 250000,
      status: "selesai",
    },
    {
      id: 3,
      tanggal: "2025-01-12",
      kendaraan: "F 5555 ZZ - Suzuki Ertiga",
      layanan: ["Ganti Oli"],
      total: 150000,
      status: "selesai",
    },
  ];

  const totalPendapatan = laporanServis.reduce(
    (sum, item) => sum + item.total,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Laporan Servis Bengkel
        </h1>
        <p className="text-sm text-gray-500">
          Rekapitulasi servis kendaraan & pendapatan bengkel
        </p>
      </div>

      {/* FILTER & RINGKASAN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* FILTER TANGGAL */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-4">Filter Periode</h3>

          <div className="space-y-3">
            <input
              type="date"
              value={filter.dari}
              onChange={(e) =>
                setFilter({ ...filter, dari: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="date"
              value={filter.sampai}
              onChange={(e) =>
                setFilter({ ...filter, sampai: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />

            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
              Terapkan Filter
            </button>
          </div>
        </div>

        {/* TOTAL SERVIS */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-center">
          <span className="text-xs text-gray-500 uppercase font-semibold">
            Total Servis Selesai
          </span>
          <span className="text-3xl font-bold text-gray-900 mt-2">
            {laporanServis.length}
          </span>
        </div>

        {/* TOTAL PENDAPATAN */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-center">
          <span className="text-xs text-gray-500 uppercase font-semibold">
            Total Pendapatan
          </span>
          <span className="text-3xl font-bold text-indigo-600 mt-2">
            Rp {totalPendapatan.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* TABEL LAPORAN */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Tanggal</th>
              <th className="px-4 py-3 text-left">Kendaraan</th>
              <th className="px-4 py-3 text-left">Layanan</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {laporanServis.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-3">{item.tanggal}</td>
                <td className="px-4 py-3">{item.kendaraan}</td>
                <td className="px-4 py-3">
                  {item.layanan.join(", ")}
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  Rp {item.total.toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Selesai
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER NOTE */}
      <div className="mt-6 text-xs text-gray-500">
        * Data laporan diambil dari servis yang berstatus <b>selesai</b>.
      </div>

    </div>
  );
}

export default Laporan;
