var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
  res.send('media ok');
});
module.exports = router;
