import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { toast } from "react-toastify";

function Riwayat() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiwayat();
  }, []);

  // ================= FETCH RIWAYAT =================
  const fetchRiwayat = async () => {
    setLoading(true);

    const { data, error } = await supabase
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
      .order("tanggal_servis", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setRiwayat(data);
    }

    setLoading(false);
  };

  // ================= UPDATE STATUS =================
  const tandaiSelesaiGroup = async (ids) => {
  const { error } = await supabase
    .from("booking")
    .update({ status: "selesai" })
    .in("id", ids);

  if (error) {
    toast.error("Gagal mengubah status");
  } else {
    toast.success("Semua layanan ditandai selesai");
    fetchRiwayat();
  }
};

  const statusBadge = (status) => {
    if (status === "selesai") return "bg-green-100 text-green-700";
    if (status === "proses") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-600";
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  const groupedRiwayat = Object.values(
  riwayat.reduce((acc, item) => {
    const key = `${item.vechile.no_polisi}-${item.tanggal_servis}-${item.status}`;

    if (!acc[key]) {
      acc[key] = {
        key,
        tanggal: item.tanggal_servis,
        status: item.status,
        vechile: item.vechile,
        layanan: [],
        total: 0,
        ids: [], // simpan id booking untuk update status
      };
    }

    acc[key].layanan.push(item.layanan.nama_layanan);
    acc[key].total += Number(item.total_biaya || item.layanan.harga);
    acc[key].ids.push(item.id);

    return acc;
  }, {})
);


  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-1xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Riwayat Servis Kendaraan
          </h1>
          <p className="text-sm text-gray-500">
            Data booking servis kendaraan
          </p>
        </div>

        {/* LIST */}
        <div className="space-y-4">
  {groupedRiwayat.map((item) => (
    <div
      key={item.key}
      className="bg-white border border-zinc-200 shadow-lg rounded-xl p-5"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-800">
            {item.vechile.no_polisi} – {item.vechile.merk} {item.vechile.model}
          </h3>
          <p className="text-xs text-gray-500">
            Tanggal: {item.tanggal}
          </p>
        </div>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadge(
            item.status
          )}`}
        >
          {item.status}
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
          {/* Rp {item.total.toLocaleString("id-ID")} */}
        </span>

        {item.status === "proses" && (
          <button
            onClick={() => tandaiSelesaiGroup(item.ids)}
            className="text-sm bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700"
          >
            Tandai Selesai
          </button>
        )}
      </div>
    </div>
  ))}

  {groupedRiwayat.length === 0 && (
    <p className="text-center text-gray-500">
      Belum ada data servis
    </p>
  )}
</div>

      </div>
    </div>
  );
}

export default Riwayat;
