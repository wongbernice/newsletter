const express = require('express');
const router = express.Router();
const create_group = require('../create_group');

router.post('/', async function(req, res, next) {
  try {
    res.json(await create_group.create(req.body));
  } catch (err) {
    console.error(`Error while creating group and newsletter`, err.message);
    next(err);
  }
});

module.exports=router;