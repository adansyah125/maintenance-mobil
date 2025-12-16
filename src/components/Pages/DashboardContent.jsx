import { Link } from 'react-router-dom';

const PRIMARY_COLOR = 'indigo';

const DashboardContent = () => {
  return (
    <div className="w-full text-gray-800">

      {/* --- HEADER --- */}
      <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Dashboard Maintenance Bengkel
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
              Total Pendapatan Servis
            </span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-sm text-gray-500">Rp</span>
              <span className={`text-2xl font-bold text-${PRIMARY_COLOR}-600`}>
                12.500.000
              </span>
            </div>
          </div>

          {/* Total Kendaraan */}
          <div className="px-4">
            <span className="text-xs font-bold text-gray-400 uppercase">
              Kendaraan Diservis
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-800">
                38
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
                Servis Berat
              </span>
              <Link to="/servis-berat" className="text-xs text-red-600 hover:underline">
                Detail →
              </Link>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-red-600">
                6
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Analisis Jenis Servis
            </h3>
          </div>

          <div className="relative h-[220px] w-full pt-6">
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-300">
              <div className="border-b border-dashed"></div>
              <div className="border-b border-dashed"></div>
              <div className="border-b border-dashed"></div>
              <div className="border-b"></div>
            </div>

            <div className="absolute inset-0 grid grid-cols-3 gap-8 items-end px-4">

              {/* Ganti Oli */}
              <div className="flex flex-col items-center justify-end group">
                <div className="opacity-0 group-hover:opacity-100 mb-1 text-xs bg-white px-2 rounded shadow">
                  15 Servis
                </div>
                <div className={`w-full max-w-[80px] h-[70%] bg-${PRIMARY_COLOR}-500 rounded-t-sm relative`}>
                  <div className="absolute top-2 w-full text-center text-xs text-white">
                    40%
                  </div>
                </div>
                <p className="mt-3 text-sm font-semibold">Ganti Oli</p>
              </div>

              {/* Tune Up */}
              <div className="flex flex-col items-center justify-end group">
                <div className="opacity-0 group-hover:opacity-100 mb-1 text-xs bg-white px-2 rounded shadow">
                  13 Servis
                </div>
                <div className={`w-full max-w-[80px] h-[60%] bg-${PRIMARY_COLOR}-400 rounded-t-sm`}>
                  <div className="absolute top-2 w-full text-center text-xs text-white">
                    35%
                  </div>
                </div>
                <p className="mt-3 text-sm font-semibold">Tune Up</p>
              </div>

              {/* Servis Rem */}
              <div className="flex flex-col items-center justify-end group">
                <div className="opacity-0 group-hover:opacity-100 mb-1 text-xs bg-white px-2 rounded shadow">
                  10 Servis
                </div>
                <div className="w-full max-w-[80px] h-[45%] bg-red-500 rounded-t-sm">
                  <div className="absolute top-2 w-full text-center text-xs text-white">
                    25%
                  </div>
                </div>
                <p className="mt-3 text-sm font-semibold">Servis Rem</p>
              </div>

            </div>
          </div>
        </div>

        {/* DAFTAR LAYANAN */}
        <div className="border-l border-gray-100 pl-0 lg:pl-8">
          <h3 className="text-lg font-bold mb-5">
            Daftar Layanan & Harga
          </h3>

          <div className="space-y-4">
            {[
              { name: "Ganti Oli", price: "150.000" },
              { name: "Tune Up Mesin", price: "300.000" },
              { name: "Servis Rem", price: "250.000" },
              { name: "Spooring & Balancing", price: "400.000" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className={`font-bold text-${PRIMARY_COLOR}-600`}>
                  Rp {item.price}
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
