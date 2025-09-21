const express = require('express');
const router = express.Router();
const { getNewsletters } = require('../get_newsletters');

router.get('/api/group/:groupId/newsletters', async function(req, res, next) {
  try {
    res.json(await getNewsletters(req.params.groupId));
  } catch (err) {
    console.error(`Error while getting newsletters for group`, err.message);
    next(err);
  }
});

module.exports=router;