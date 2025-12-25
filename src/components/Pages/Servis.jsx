import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { toast } from "react-toastify";

function Servis() {
  const [vechile, setvechile] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedVechile, setselectedVechile] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [catatan, setCatatan] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= FETCH DATA =================
  useEffect(() => {
    fetcVechile();
    fetchService();
  }, []);

  const fetcVechile = async () => {
    const { data, error } = await supabase
      .from("vechile")
      .select("id, no_polisi, merk, model, tahun")
      .order("created_at", { ascending: false });

    if (!error) setvechile(data);
  };

  const fetchService = async () => {
    const { data, error } = await supabase
      .from("layanan")
      .select("id, nama_layanan, harga")
      .order("nama_layanan");

    if (!error) setServices(data);
  };

  // ================= LOGIC =================
  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.find((s) => s.id === service.id)
        ? prev.filter((s) => s.id !== service.id)
        : [...prev, service]
    );
  };

  const totalHarga = selectedServices.reduce(
    (total, s) => total + Number(s.harga),
    0
  );

  // ================= SUBMIT =================
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (!selectedVechile || selectedServices.length === 0) {
    alert("Pilih kendaraan & layanan");
    setLoading(false);
    return;
  }

  // buat banyak booking (1 layanan = 1 booking)
  const payload = selectedServices.map((service) => ({
    vechile_id: selectedVechile,
    layanan_id: service.id,
    tanggal_servis: tanggal,
    keluhan: catatan,
    total_biaya: totalHarga,
    status: "proses",
  }));

  const { error } = await supabase
    .from("booking")
    .insert(payload);

  if (error) {
    console.error(error);
    toast.error("Gagal Booking Servis");
  } else {
    toast.success("Booking servis berhasil 🚗🔧");
  }

  // reset form
  setselectedVechile("");
  setSelectedServices([]);
  setTanggal("");
  setCatatan("");
  setLoading(false);
};


  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-1xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Booking Servis Bengkel
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Isi data kendaraan dan pilih layanan servis
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm"
        >

          {/* Kendaraan */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Kendaraan
            </label>
            <select
              value={selectedVechile}
              onChange={(e) => setselectedVechile(e.target.value)}
              className="w-full border border-zinc-200 shadow-md rounded-lg px-4 py-2 text-gray-500"
              required
            >
              <option value="">-- Pilih Kendaraan --</option>
              {vechile.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.no_polisi} - {v.merk} {v.model} ({v.tahun})
                </option>
              ))}
            </select>
          </div>

          {/* Layanan */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3">
              Layanan Servis
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((s) => {
                const active = selectedServices.find((x) => x.id === s.id);
                return (
                  <div
                    key={s.id}
                    onClick={() => toggleService(s)}
                    className={`cursor-pointer border border-zinc-200 shadow-md rounded-lg p-4 transition
                      ${
                        active
                          ? "border-indigo-600 bg-indigo-50"
                          : "hover:border-indigo-400"
                      }`}
                  >
                    <div className="flex justify-between text-black">
                      <span className="font-sans">
                        {s.nama_layanan}
                      </span>
                      <span className="font-bold text-black">
                        {/* Rp {Number(s.harga).toLocaleString("id-ID")} */}
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

          {/* Tanggal */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Tanggal Servis
            </label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full border border-zinc-200 shadow-md text-gray-500 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Catatan */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Keluhan / Catatan
            </label>
            <textarea
              rows="3"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full border border-zinc-200 shadow-md rounded-lg px-4 py-2"
              placeholder="(Optional)"
            />
          </div>

          {/* Total */}
          <div className="flex justify-between items-center border-t pt-4">
            {/* <span className="font-semibold">Estimasi Biaya</span>
            <span className="text-xl font-bold">
              Rp {totalHarga.toLocaleString("id-ID")}
            </span> */}
          </div>

          {/* Submit */}
          <div className="text-right mt-6">
            <button
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
            >
              {loading ? "Menyimpan..." : "Booking Servis"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Servis;
