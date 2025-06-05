# React-Mern-Image-Upload-Tutorial
# 📸 React MERN Image Upload Tutorial

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to upload an image with a title. The image is uploaded to ImgBB and the metadata is stored in MongoDB.

## 🧩 Features

- Upload an image and title from the frontend
- Encode images as base64 for upload
- Save uploaded image URL and metadata in MongoDB
- Preview the uploaded image immediately after upload
- Clean and minimal UI

## 🚀 Tech Stack

- **Frontend:** React, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Image Hosting:** ImgBB API

---

## 🛠️ Getting Started

### 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/MoAlhaddad/React-Mern-Image-Upload-Tutorial.git
cd React-Mern-Image-Upload-Tutorial
Install dependencies for backend and frontend:

bash
Copy
Edit
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
Set up environment variables:

Create a .env file in your backend directory:

env
Copy
Edit
IMGBB_API_KEY=your_imgbb_api_key_here
MONGO_URI=your_mongodb_connection_uri
PORT=5000
🧠 You can get your ImgBB API key at https://api.imgbb.com/

Start the development servers:

bash
Copy
Edit
# In backend directory
npm run dev

# In frontend directory (separate terminal)
npm run dev
Visit http://localhost:5173 to use the app.

💡 Contribution
Pull requests are welcome! If you'd like to improve the project or fix a bug, feel free to fork the repo and submit a PR.

📎 License
This project is open-source and available under the MIT License.