const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());
const PORT = 3001;
const createGroupRouter = require('./routes/creategroup');

const cors = require("cors");
app.use(cors()); 

app.get("/", (req, res) => {
    res.json({ status: "READY!" });
});

app.use('/create_group', createGroupRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// call add_user_to_group.js
const addUserToGroupRouter = require('./routes/addusertogroup');
app.use('/add_user_to_group', addUserToGroupRouter)

// call get_groups.js
const getGroupsRouter = require('./routes/getgroups');
app.use('/get_groups', getGroupsRouter);

// call add_update.js
const addUpdateRouter = require('./routes/addupdate');
app.use('/', addUpdateRouter);

app.get("/db-test", (req, res) => {
    db.query("SELECT NOW() AS currentTime", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ status: "DB Connected!", time: results[0].currentTime });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});