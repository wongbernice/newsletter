const express = require('express');
const router = express.Router();
const add_user_to_group = require('../add_user_to_group');

router.post('/', async function(req, res, next) {
  try {
    res.json(await add_user_to_group.addUserToGroup(req.body));
  } catch (err) {
    console.error(`Error while adding user to group`, err.message);
    next(err);
  }
});

module.exports=router;