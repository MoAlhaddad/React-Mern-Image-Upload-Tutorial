import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
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

        console.log(res.data);
        setUploadedImageUrl(res.data.imageUrl); // Set the image URL from the response
        setMessage("✅ Upload successful!");
        setTitle("");
        setImage(null);
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

      {uploadedImageUrl && (
        <div style={{ marginTop: "1rem" }}>
          <h4>🎉 Uploaded Image:</h4>
          <img src={uploadedImageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

