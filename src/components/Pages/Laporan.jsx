import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

function Laporan() {
  const [filter, setFilter] = useState({
    dari: "",
    sampai: "",
  });

  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLaporan();
  }, []);

  // ================= FETCH LAPORAN =================
  const fetchLaporan = async () => {
    setLoading(true);

    let query = supabase
      .from("booking")
      .select(`
        id,
        tanggal_servis,
        total_biaya,
        status,
        vechile (
          no_polisi,
          merk,
          model
        ),
        layanan (
          nama_layanan,
          harga
        )
      `)
      .eq("status", "selesai")
      .order("tanggal_servis", { ascending: false });

    if (filter.dari)
      query = query.gte("tanggal_servis", filter.dari);
    if (filter.sampai)
      query = query.lte("tanggal_servis", filter.sampai);

    const { data, error } = await query;

    if (error) {
      console.error(error);
    } else {
      setLaporan(data);
    }

    setLoading(false);
  };

  // ================= TOTAL =================
  // const totalPendapatan = laporan.reduce(
  //   (sum, item) => sum + Number(item.total_biaya),
  //   0
  // );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Laporan Servis Bengkel
        </h1>
        <p className="text-sm text-gray-500">
          Rekap servis kendaraan yang sudah selesai
        </p>
      </div>

      {/* FILTER & RINGKASAN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* FILTER */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-lg">
          <h3 className="font-semibold mb-4">Filter Periode</h3>

          <div className="space-y-3">
            <input
              type="date"
              value={filter.dari}
              onChange={(e) =>
                setFilter({ ...filter, dari: e.target.value })
              }
              className="w-full border border-zinc-200 text-gray-500 shadow-md rounded-lg px-3 py-2"
            />

            <input
              type="date"
              value={filter.sampai}
              onChange={(e) =>
                setFilter({ ...filter, sampai: e.target.value })
              }
              className="w-full border border-zinc-200 text-gray-500 shadow-md rounded-lg px-3 py-2"
            />

            <button
              onClick={fetchLaporan}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Terapkan Filter
            </button>
          </div>
        </div>

        {/* TOTAL SERVIS */}
        <div className="bg-white border border-zinc-200  rounded-xl p-5 shadow-lg flex flex-col justify-center">
          <span className="text-xs text-gray-500 uppercase font-semibold">
            Total Servis Selesai
          </span>
          <span className="text-3xl font-bold text-gray-900 mt-2">
            {laporan.length}
          </span>
        </div>

        {/* TOTAL PENDAPATAN */}
        {/* <div className="bg-white border rounded-xl p-5 shadow-sm flex flex-col justify-center">
          <span className="text-xs text-gray-500 uppercase font-semibold">
            Total Pendapatan
          </span>
          <span className="text-3xl font-bold text-indigo-600 mt-2">
            Rp {totalPendapatan.toLocaleString("id-ID")}
          </span>
        </div> */}
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs text-center">
            <tr>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Kendaraan</th>
              <th className="px-4 py-3">Layanan</th>
              {/* <th className="px-4 py-3">Total</th> */}
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {laporan.map((item) => (
              <tr key={item.id} className="border-t text-center">
                <td className="px-4 py-3">
                  {item.tanggal_servis}
                </td>
                <td className="px-4 py-3">
                  {item.vechile.no_polisi} –{" "}
                  {item.vechile.merk} {item.vechile.model}
                </td>
                <td className="px-4 py-3">
                  {item.layanan.nama_layanan}
                </td>
                {/* <td className="px-4 py-3  font-semibold">
                  Rp {Number(item.layanan.harga).toLocaleString("id-ID")}
                </td> */}
                <td className="px-4 py-3 ">
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Selesai
                  </span>
                </td>
              </tr>
            ))}

            {!loading && laporan.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  Tidak ada data laporan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* <div className="mt-6 text-xs text-gray-500">
        * Data laporan hanya menampilkan booking dengan status <b>selesai</b>.
      </div> */}
      <div className="mt-10 bg-indigo-50 border border-indigo-100 p-4 rounded-lg text-sm text-indigo-800">
        ℹ️ Data laporan hanya menampilkan booking dengan status <b>selesai</b>.
      </div>

    </div>
  );
}

export default Laporan;
