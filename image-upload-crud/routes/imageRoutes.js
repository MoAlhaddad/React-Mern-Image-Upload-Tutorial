const express = require('express');
const router = express.Router();
const axios = require('axios');
const Image = require('../models/Image'); // Your Mongoose model

// Upload a new image
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
    console.error('Error uploading image:', err);
    res.status(500).json({ message: 'Server error while uploading image.' });
  }
});

// GET all uploaded images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 }); // newest first, note field name is uploadedAt
    res.json(images);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).json({ message: 'Failed to fetch images.' });
  }
});

// UPDATE an image by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, description } = req.body;

    const updatedImage = await Image.findByIdAndUpdate(
      id,
      { title, url, description },
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json(updatedImage);
  } catch (err) {
    console.error('Error updating image:', err);
    res.status(500).json({ message: 'Server error while updating image.' });
  }
});

// DELETE an image by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedImage = await Image.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ message: 'Server error while deleting image.' });
  }
});

module.exports = router;
