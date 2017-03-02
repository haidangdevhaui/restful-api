import express from 'express';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinaryConfig from '../../config/cloudinary';
import Image from '../../models/image';

cloudinary.config(cloudinaryConfig);

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'social-network',
    allowedFormats: [
        'jpg', 'png'
    ],
    filename: function (req, file, cb) {
        cb(undefined, Date.now());
    }
});

const parser = multer({storage: storage});

const router = express.Router();

router.post('/', parser.array('images'), (req, res) => {
    let response = [];
    let images = [];
    for(var i= 0; i < req.files.length; i++){
        let _image = new Image();
        _image.uid = req.user._id;
        _image.src = req.files[i].url;
        _image.cid = req.files[i].public_id;
        _image.type = req.files[i].resource_type;
        _image.save();
        response.push(_image);
        images.push(_image._id);
    }
    res.json({
        images: images,
        response: response
    });
});

export default router;