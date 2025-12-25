import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';

const PRIMARY_COLOR = 'indigo';

const DashboardContent = () => {
   const [totalSparepart, setTotalSparepart] = useState(0);
  const [totalKendaraan, setTotalKendaraan] = useState(0);
  const [servisBerat, setServisBerat] = useState(0);
  const [analisis, setAnalisis] = useState([]);
  const [layanan, setLayanan] = useState([]);

 

  const maxTotal = Math.max(...analisis.map(a => a.total));

  const fetchDashboard = async () => {
  const { data: booking } = await supabase
    .from("booking")
    .select("total_biaya, vechile_id, layanan_id")
    .eq("status", "selesai");

  const { data: layananData } = await supabase
    .from("layanan")
    .select("id, nama_layanan, harga")

  const {data: sparepart} = await supabase
    .from("sparepart")
    .select("*")
    .order("created_at", { ascending: false });

  if (booking) {
    // total pendapatan
    // setTotalPendapatan(
    //   booking.reduce(
    //     (sum, b) => sum + Number(b.total_biaya || 0),
    //     0
    //   )
    // );

    // kendaraan unik
    setTotalKendaraan(
      new Set(booking.map((b) => b.vechile_id)).size
    );

    // servis berat (>= 500k)
    setServisBerat(
      booking.filter((b) => Number(b.total_biaya) >= 500000).length
    );

    // analisis layanan
    const map = {};
    booking.forEach((b) => {
      map[b.layanan_id] = (map[b.layanan_id] || 0) + 1;
    });

    setAnalisis(
      Object.entries(map).map(([id, total]) => ({ id, total }))
    );
  }

  setLayanan(layananData || []);
  setTotalSparepart(sparepart.length);
};

 useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <div className="w-full text-gray-800">

      {/* --- HEADER --- */}
      <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Maintenance Mobil
          </h1>
          <p className="text-sm text-gray-500">
            Ringkasan servis kendaraan bulan ini
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-400">
            Update realtime
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </div>
      </div>

      {/* --- STAT RIBBON --- */}
      <div className="bg-gray-50 rounded-lg border border-gray-100 p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200">

          {/* Total Pendapatan */}
          <div className="px-4">
            <span className="text-xs font-bold text-gray-400 uppercase">
              Total Sparepart
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              
              <span className={`text-2xl font-bold text-${PRIMARY_COLOR}-600`}>
                {totalSparepart}
              </span>
            </div>
          </div>

          {/* Total Kendaraan */}
          <div className="px-4">
            <span className="text-xs font-bold text-gray-400 uppercase">
              Kendaraan 
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-800">
                {totalKendaraan}
              </span>
              <span className="text-sm text-gray-500 bg-white border px-2 py-0.5 rounded-full">
                Unit
              </span>
            </div>
          </div>

          {/* Alert Servis Berat */}
          <div className="px-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-red-500 uppercase">
                Servis
              </span>
              {/* <Link to={"/servis"} className="text-xs text-red-600 hover:underline">
                Detail →
              </Link> */}
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-red-600">
                {servisBerat}
              </span>
              <span className="text-xs text-red-400">
                Kendaraan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ANALISIS JENIS SERVIS */}
        <div className="lg:col-span-2">
  {/* JUDUL */}
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-bold text-gray-900">
      Analisis Jenis Servis
    </h3>
  </div>

  {/* AREA GRAFIK */}
  <div className="relative h-[220px] w-full pt-6">
    {/* GARIS LATAR */}
    <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-300">
      <div className="border-b border-dashed"></div>
      <div className="border-b border-dashed"></div>
      <div className="border-b border-dashed"></div>
      <div className="border-b"></div>
    </div>

    {/* BAR */}
    {console.log("ANALISIS:", analisis)}

    <div
      className={`absolute inset-0 grid gap-8 items-end px-4`}
      style={{
        gridTemplateColumns: `repeat(${analisis.length}, minmax(0, 1fr))`,
      }}
    >
      {analisis.map((a) => {
        const l = layanan.find((x) => x.id == a.id);
        if (!l) return null;

        return (
          <div
            key={a.id}
            className="flex flex-col items-center justify-end group"
          >
            {/* Tooltip */}
            <div className="opacity-0 group-hover:opacity-100 mb-1 text-xs bg-white px-2 rounded shadow">
              {a.total} Servis
            </div>

            {/* BATANG */}
           <div
              className="w-full max-w-[80px] bg-indigo-500 rounded-t-sm transition-all duration-500"
              style={{
                height: `${(a.total / maxTotal) * 100}%`,
                minHeight: "100px",
              }}
            />

            {/* Label */}
            <p className="mt-3 text-sm font-semibold text-gray-700 text-center">
              {l.nama_layanan}
            </p>
          </div>

        );
      })}
    </div>
  </div>
</div>
        {/* DAFTAR LAYANAN */}
        <div className="border-l border-gray-100 pl-0 lg:pl-8">
          <h3 className="text-lg text-center font-bold mb-5">
            Daftar Layanan
          </h3>

          <div className="space-y-4">
            {[
              { name: "Ganti Oli" },
              { name: "Tune Up Mesin" },
              { name: "Servis Rem" },
              { name: "Spooring & Balancing" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className={`font-bold text-${PRIMARY_COLOR}-600`}>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t">
            <div className="bg-indigo-50 p-3 rounded text-xs text-indigo-800 flex gap-2">
              🚗
              <p>
                Harga dapat berubah sesuai kondisi kendaraan dan suku cadang.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardContent;
