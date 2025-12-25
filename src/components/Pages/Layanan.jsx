import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const initialForm = {
  nama_layanan: "",
  deskripsi: "",
  harga: "",
  estimasi: "",
};

function Layanan() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  /* ================= FETCH DATA ================= */
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("layanan")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setServices(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ================= HANDLE FORM ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.nama_layanan || !form.harga) {
      setError("Nama layanan dan harga wajib diisi");
      return false;
    }
    if (isNaN(form.harga)) {
      setError("Harga harus berupa angka");
      return false;
    }
    setError("");
    return true;
  };

  /* ================= CREATE & UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editId) {
      await supabase
        .from("layanan")
        .update(form)
        .eq("id", editId);
    } else {
      await supabase.from("layanan").insert([form]);
    }

    setShowModal(false);
    setForm(initialForm);
    setEditId(null);
    fetchData();
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus layanan ini?")) return;
    await supabase.from("layanan").delete().eq("id", id);
    fetchData();
  };

  /* ================= EDIT ================= */
  const handleEdit = (service) => {
    setForm(service);
    setEditId(service.id);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* HEADER */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Daftar Layanan Bengkel
          </h1>
          <p className="text-sm text-gray-500">
            Kelola layanan servis kendaraan
          </p>
        </div>

        <button
          onClick={() => {
            setForm(initialForm);
            setEditId(null);
            setShowModal(true);
          }}
          className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
        >
          ➕ Tambah Layanan
        </button>
      </div>

      {/* LOADING */}
      {loading && <p className="text-gray-500">Memuat layanan...</p>}

      {/* CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-indigo-600">
              {service.nama_layanan}
            </h3>

            <p className="text-xs text-gray-500 mb-2">
              Estimasi: {service.estimasi || "-"}
            </p>

            <p className="text-sm text-gray-600 mb-4">
              {service.deskripsi || "Tidak ada deskripsi"}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-black">
                {/* Rp{Number(service.harga).toLocaleString("id-ID")} */}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Layanan" : "Tambah Layanan"}
            </h2>

            {error && (
              <div className="mb-3 text-sm text-red-600">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="nama_layanan"
                placeholder="Nama Layanan"
                value={form.nama_layanan}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />

              <textarea
                name="deskripsi"
                placeholder="Deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                type="number"
                name="harga"
                placeholder="Harga"
                value={form.harga}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                type="text"
                name="estimasi"
                placeholder="Estimasi (contoh: 30 menit)"
                value={form.estimasi}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INFO */}
      <div className="mt-10 bg-indigo-50 border p-4 rounded-lg text-sm text-indigo-800">
        ℹ️ Harga dapat berubah sesuai kondisi kendaraan.
      </div>
    </div>
  );
}

export default Layanan;
