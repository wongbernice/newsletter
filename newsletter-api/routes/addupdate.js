const express = require('express');
const router = express.Router();
const {addUpdate} = require('../add_update');

router.post('/api/group/:groupId/updates', async function(req, res, next) {
  try {
    const groupId = req.params.groupId;
    const { user_id, title, content } = req.body;
    
    res.json(await addUpdate({groupId, user_id, title, content}));
  } catch (err) {
    console.error(`Error while adding update to newsletter`, err.message);
    next(err);
  }
});

module.exports=router;