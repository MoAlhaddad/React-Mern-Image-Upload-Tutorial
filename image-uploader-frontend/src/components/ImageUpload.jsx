import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !image) return alert("Please fill out all fields.");

    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];

      try {
        setUploading(true);
        const res = await axios.post("http://localhost:5000/api/images/upload", {
          title,
          base64: base64Image,
        });

        console.log("Upload response:", res.data);
        setUploadedImageUrl(res.data.imageUrl || res.data.data?.imageUrl || "");
        setMessage("✅ Upload successful!");
        setTitle("");
        setImage(null);
        setPreviewImage("");
      } catch (err) {
        console.error(err);
        setMessage("❌ Upload failed.");
        setUploadedImageUrl("");
      } finally {
        setUploading(false);
      }
    };
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <h2>🖼️ Upload an Image</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <br /><br />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && <p>{message}</p>}

      {previewImage && (
        <div style={{ marginTop: "1rem" }}>
          <h4>🔍 Preview:</h4>
          <img src={previewImage} alt="Preview" style={{ maxWidth: "100%" }} />
        </div>
      )}

      {uploadedImageUrl && (
        <div style={{ marginTop: "1rem" }}>
          <h4>🎉 Uploaded Image:</h4>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            style={{ maxWidth: "100%" }}
            className="mt-2 max-w-xs rounded-lg border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
