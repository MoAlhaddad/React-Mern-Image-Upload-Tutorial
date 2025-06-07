import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch images from backend on mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/images");
      setImages(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch images.");
    } finally {
      setLoading(false);
    }
  };

  // Start editing mode
  const handleEdit = (image) => {
    setEditingId(image._id);
    setEditTitle(image.title);
    setEditDescription(image.description || "");
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // Save updates
  const handleSave = async (id) => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty.");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/images/${id}`, {
        title: editTitle,
        description: editDescription,
      });
      // Update local state
      setImages((prev) =>
        prev.map((img) =>
          img._id === id ? { ...img, title: editTitle, description: editDescription } : img
        )
      );
      handleCancel();
    } catch (err) {
      alert("Failed to update image.");
    }
  };

  // Delete an image
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/images/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      alert("Failed to delete image.");
    }
  };

  return (
    <div className="page">
      <h2>📸 Uploaded Images</h2>

      {loading && <p>Loading images...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {images.length === 0 && !loading && <p>No images uploaded yet.</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
        {images.map((img) => (
          <div key={img._id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: 8 }}>
            <img
              src={img.url}
              alt={img.title}
              style={{ width: "100%", height: "auto", borderRadius: 8, marginBottom: "0.5rem" }}
            />

            {editingId === img._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ width: "100%", marginBottom: "0.5rem" }}
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Add a description (optional)"
                  rows={3}
                  style={{ width: "100%", marginBottom: "0.5rem" }}
                />
                <button onClick={() => handleSave(img._id)} style={{ marginRight: "0.5rem" }}>
                  Save
                </button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{img.title}</h3>
                <p>{img.description || <em>No description</em>}</p>
                <button onClick={() => handleEdit(img)} style={{ marginRight: "0.5rem" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(img._id)} style={{ color: "red" }}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
