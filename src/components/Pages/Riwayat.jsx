import React, { useState } from "react";

function Riwayat() {
  const [riwayatServis, setRiwayatServis] = useState([
    {
      id: 1,
      kendaraan: "D 1234 AB - Toyota Avanza",
      tanggal: "2025-01-10",
      layanan: ["Ganti Oli", "Tune Up"],
      total: 450000,
      status: "proses",
    },
    {
      id: 2,
      kendaraan: "B 9876 CD - Honda Brio",
      tanggal: "2025-01-05",
      layanan: ["Servis Rem"],
      total: 250000,
      status: "selesai",
    },
  ]);

  const tandaiSelesai = (id) => {
    setRiwayatServis((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "selesai" } : item
      )
    );
  };

  const statusBadge = (status) => {
    if (status === "selesai")
      return "bg-green-100 text-green-700";
    if (status === "proses")
      return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Riwayat Servis Kendaraan
        </h1>
        <p className="text-sm text-gray-500">
          Daftar servis kendaraan yang pernah dilakukan
        </p>
      </div>

      {/* LIST RIWAYAT */}
      <div className="space-y-4 max-w-4xl">
        {riwayatServis.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {item.kendaraan}
                </h3>
                <p className="text-xs text-gray-500">
                  Tanggal Servis: {item.tanggal}
                </p>
              </div>

              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadge(
                  item.status
                )}`}
              >
                {item.status === "selesai" ? "Selesai" : "Diproses"}
              </span>
            </div>

            {/* LAYANAN */}
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Layanan:
              </p>
              <div className="flex flex-wrap gap-2">
                {item.layanan.map((l, i) => (
                  <span
                    key={i}
                    className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* TOTAL & ACTION */}
            <div className="flex justify-between items-center border-t pt-3">
              <span className="font-bold text-indigo-600">
                Rp {item.total.toLocaleString("id-ID")}
              </span>

              {item.status !== "selesai" && (
                <button
                  onClick={() => tandaiSelesai(item.id)}
                  className="text-sm bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition"
                >
                  Tandai Selesai
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Riwayat;
