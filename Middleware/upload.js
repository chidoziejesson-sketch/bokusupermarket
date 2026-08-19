// Upload images to Cloudinary
const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../Config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bokusupermarket', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed image formats
        transformation: [{ width: 500, height: 500, crop: 'limit' }], // Resize images to a maximum of 500x500 pixels
    },
});

module.exports = multer({ storage });