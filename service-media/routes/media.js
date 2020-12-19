const express = require('express');
const router = express.Router();
const isBase64 = require('is-base64');
const base64Img = require('base64-img');

const { Media } = require('../models');
const { route } = require('.');
const fs = require('fs');

//route get all data
router.get('/', async (req, res) => {
  const media = await Media.findAll({
    attributes: ['id','image']
  });
  
  const mapImage = media.map((m) => {
    m.image = `${req.get('host')}/${m.image}`;
    return m;
  });
   res.json({
     status: 'success',
     data: mapImage
   });
});

//route post data
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
    const media = await Media.create({ image: `images/${filename}`});

    return res.json({
      status: 'success',
      data: {
        id: media.id,
        image: `${req.get('host')}/images/${filename}`
      }
    });
  });
});

// route delete data
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const media = await Media.findByPk(id);

  if (!media) {
    return  res.status(404).json({status: 'error', message: 'media not found!'});
  }

  fs.unlink(`./public/${media.image}`, async (err) => {
    if (err) {
      return res.status(400).json({status: 'error', message: err.message});
    }

    await media.destroy();

    return  res.json({
      status: 'success',
      message: 'image deleted'
    });
  });
});

module.exports = router;
