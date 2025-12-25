import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const Sparepart = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    id: null,
    kd_sparepart: "",
    nama: "",
    stok: "",
    harga: "",
    keterangan: "",
    gambar: "",
  });

  // ================= AUTO KODE =================
  const generateKode = async () => {
    const { data } = await supabase
      .from("sparepart")
      .select("kd_sparepart")
      .order("created_at", { ascending: false })
      .limit(1);

    if (!data || data.length === 0) return "SP_0001";

    const last = parseInt(data[0].kd_sparepart.split("_")[1]);
    return `SP_${String(last + 1).padStart(4, "0")}`;
  };

  // ================= GET DATA =================
  const fetchData = async () => {
    const { data } = await supabase
      .from("sparepart")
      .select("*")
      .order("created_at", { ascending: false });

    setData(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= UPLOAD IMAGE =================
  const uploadImage = async () => {
    if (!file) return form.gambar;

    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("sparepart")
      .upload(fileName, file);

    if (error) {
      alert("Gagal upload gambar");
      return null;
    }

    const { data } = supabase.storage
      .from("sparepart")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imageUrl = await uploadImage();

    if (form.id) {
      await supabase
        .from("sparepart")
        .update({
          nama: form.nama,
          stok: form.stok,
          harga: form.harga,
          keterangan: form.keterangan,
          gambar: imageUrl,
        })
        .eq("id", form.id);
    } else {
      const kode = await generateKode();

      await supabase.from("sparepart").insert({
        kd_sparepart: kode,
        nama: form.nama,
        stok: form.stok,
        harga: form.harga,
        keterangan: form.keterangan,
        gambar: imageUrl,
      });
    }

    resetForm();
    fetchData();
    setLoading(false);
    setShowModal(false);
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm(item);
    setShowModal(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Hapus sparepart?")) return;
    await supabase.from("sparepart").delete().eq("id", id);
    fetchData();
  };

  const resetForm = () => {
    setForm({
      id: null,
      kd_sparepart: "",
      nama: "",
      stok: "",
      harga: "",
      keterangan: "",
      gambar: "",
    });
    setFile(null);
  };

  return (
  <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Manajemen Sparepart
        </h1>
        <p className="text-sm text-gray-500">
          Kelola stok dan harga sparepart bengkel
        </p>
      </div>

      <button
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
      >
        ➕ Tambah Sparepart
      </button>
    </div>

    {/* TABLE (DESKTOP) */}
    <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="p-3">Kode</th>
            <th>Nama</th>
            <th>Stok</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition text-center"
            >
              {/* <td >
                {item.gambar ? (
                  <img
                    src={item.gambar}
                    className="w-12 h-12 rounded object-cover mx-auto"
                    alt="Kosong"
                  />
                  
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                    No Img
                  </div>
                )}
              </td> */}
              <td className="font-medium p-3">{item.kd_sparepart}</td>
              <td>{item.nama}</td>
              <td className="text-center">{item.stok}</td>
              <td className="font-semibold text-indigo-600">
                Rp {Number(item.harga).toLocaleString("id-ID")}
              </td>
              <td className="space-x-1">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded cursor-pointer"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* MOBILE CARD */}
    <div className="md:hidden space-y-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow p-4 space-y-2"
        >
          <div className="flex gap-3">
            {/* {item.gambar ? (
              <img
                src={item.gambar}
                className="w-16 h-16 rounded object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs">
                No Img
              </div>
            )} */}

            <div>
              <p className="font-bold">{item.nama}</p>
              <p className="text-xs text-gray-500">
                {item.kd_sparepart}
              </p>
              <p className="text-sm mt-1">
                Stok: <b>{item.stok}</b>
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-semibold text-indigo-600">
              Rp {Number(item.harga).toLocaleString("id-ID")}
            </span>

            <div className="space-x-3 text-sm">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* MODAL */}
    {showModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-white rounded-xl w-full max-w-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            {form.id ? "Edit Sparepart" : "Tambah Sparepart"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Nama Sparepart"
              value={form.nama}
              onChange={(e) =>
                setForm({ ...form, nama: e.target.value })
              }
              className="w-full border rounded-lg p-2"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Stok"
                value={form.stok}
                onChange={(e) =>
                  setForm({ ...form, stok: e.target.value })
                }
                className="border rounded-lg p-2"
                required
              />
              <input
                type="number"
                placeholder="Harga"
                value={form.harga}
                onChange={(e) =>
                  setForm({ ...form, harga: e.target.value })
                }
                className="border rounded-lg p-2"
                required
              />
            </div>

            <textarea
              placeholder="Keterangan"
              value={form.keterangan}
              onChange={(e) =>
                setForm({ ...form, keterangan: e.target.value })
              }
              className="w-full border rounded-lg p-2"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);

};

export default Sparepart;
