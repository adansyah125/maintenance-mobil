import React, {  useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { toast } from "react-toastify";

function DataKendaraan() {
  const [vechiles, setvechiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    no_polisi: "",
    nama_pemilik: "",
    merk: "",
    model: "",
    tahun: "",
  });

 

  const fetchData = useCallback(async () => {
  setLoading(true);
  try {
    const { data, error } = await supabase
      .from("vechile") 
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    
    setvechiles(data || []);
  } catch (error) {
    console.error("Error fetching vehicles:", error.message);
    toast.error("Gagal memuat data kendaraan");
  } finally {
    setLoading(false);
  }
}, []);
  
   useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      no_polisi: "",
      nama_pemilik: "",
      merk: "",
      model: "",
      tahun: "",
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.no_polisi || !form.nama_pemilik) {
      toast.warning("No polisi dan nama pemilik wajib diisi");
      return;
    }

    if (editId) {
      // UPDATE
      const { error } = await supabase
        .from("vechile")
        .update(form)
        .eq("id", editId);

      if (error) {
        toast.error("Gagal mengupdate kendaraan");
      } else {
        toast.success("Data kendaraan berhasil diupdate");
        fetchData();
        resetForm();
      }
    } else {
      // INSERT
      const { error } = await supabase
        .from("vechile")
        .insert([form]);

      if (error) {
        toast.error("Gagal menambah kendaraan");
      } else {
        toast.success("Kendaraan berhasil ditambahkan");
        fetchData();
        resetForm();
      }
    }
  };

  const handleEdit = (vechile) => {
    setEditId(vechile.id);
    setForm({
      no_polisi: vechile.no_polisi,
      nama_pemilik: vechile.nama_pemilik,
      merk: vechile.merk,
      model: vechile.model,
      tahun: vechile.tahun,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus kendaraan ini?")) return;

    const { error } = await supabase
      .from("vechile")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Gagal menghapus kendaraan");
    } else {
      toast.success("Kendaraan berhasil dihapus");
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Data Kendaraan</h1>
        <p className="text-sm text-gray-500">
          Tambah, edit, dan hapus data kendaraan pelanggan
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
        <h2 className="font-semibold mb-4">
          {editId ? "✏️ Edit Kendaraan" : "➕ Tambah Kendaraan"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input name="no_polisi" value={form.no_polisi} onChange={handleChange}
            placeholder="No Polisi" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
          <input name="nama_pemilik" value={form.nama_pemilik} onChange={handleChange}
            placeholder="Nama Pemilik" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
          <input name="merk" value={form.merk} onChange={handleChange}
            placeholder="Merk" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
          <input name="model" value={form.model} onChange={handleChange}
            placeholder="Model" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />
          <input name="tahun" type="number" value={form.tahun} onChange={handleChange}
            placeholder="Tahun" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" />

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700"
            >
              {editId ? "Update" : "Simpan"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vechiles.map((v) => (
            <div key={v.id} className="bg-white border rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold mb-1">🚗 {v.no_polisi}</h3>
              <p className="text-sm text-gray-600">{v.nama_pemilik}</p>
              <p className="text-sm text-gray-600">
                {v.merk} {v.model} ({v.tahun})
              </p>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(v)}
                  className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(v.id)}
                  className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default DataKendaraan;
