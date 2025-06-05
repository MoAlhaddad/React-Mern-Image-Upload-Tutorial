const express = require('express');
const router = express.Router();
const axios = require('axios');
const Image = require('../models/Image'); // Your Mongoose model

router.post('/upload', async (req, res) => {
  try {
    const { title, base64 } = req.body;

    if (!base64 || !title) {
      return res.status(400).json({ message: 'Title and base64 image are required.' });
    }

    const params = new URLSearchParams();
    params.append('image', base64);
    params.append('name', title);

    const imgbbResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      params,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const imageUrl = imgbbResponse.data.data.url;

    const newImage = new Image({
      title,
      url: imageUrl,
    });

    const saved = await newImage.save();
    res.status(201).json(saved);

  } catch (err) {
    console.error('Error uploading image:', err); // ✅ Corrected
    res.status(500).json({ message: 'Server error while uploading image.' });
  }
});

module.exports = router;
