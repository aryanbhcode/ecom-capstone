import { useEffect, useState } from "react";
import API from "../utils/api";
import "../index.css"; // ensure styles are applied

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, form);
      } else {
        await API.post("/products", form);
      }
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error saving product");
    }
  };

  const handleEdit = (product) => {
    setForm({ ...product });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await API.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <h2>{editingId ? "Edit Product" : "Add Product"}</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <button type="submit" className="add-btn">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <h2>Products List</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                {p.imageUrl && (
                  <img src={p.imageUrl} alt={p.name} className="table-img" />
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(p)} className="edit-btn">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
