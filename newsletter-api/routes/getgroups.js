const express = require('express');
const router = express.Router();
const { getUserGroups } = require('../get_groups');

router.get('/api/user/:userId/groups', async function(req, res, next) {
  try {
    res.json(await getUserGroups(req.params.userId));
  } catch (err) {
    console.error(`Error while getting user groups`, err.message);
    next(err);
  }
});

module.exports=router;