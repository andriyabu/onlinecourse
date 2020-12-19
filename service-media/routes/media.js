var express = require('express');
var router = express.Router();
const isBase64 = require('is-base64');
const base64Img = require('base64-img');

const { Media } = require('../models');

router.post('/', (req, res) => {
  // receive image from request body
  const image = req.body.image;

  //check if image is base64
  if (!isBase64(image, { mimeRequired: true })) {
    //if not base64
    return res.status(400).json({status: 'error', message: 'invalid base64'});
  }
  
  //if base64
  base64Img.img(image,'./public/images',Date.now(),async (err,filepath) => {
    if (err) {
      return res.status(400).json({status: 'error',message: err.message});  
    }

    //convert filepath as array and take the latest index
    const filename = filepath.split('/').pop();

    // save image to tanble media
    const media = await Media.create({ image: `image/${filename}`});

    return res.json({
      status: 'success',
      data: {
        id: media.id,
        image: `${req.get('host')}/images/${filename}`
      }
    });
  });
});
module.exports = router;
