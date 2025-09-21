const express=require("express");
const path=require("path");
const app=express();

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dash.html"));
});

app.listen(3000, () => {
  console.log("Frontend running at http://localhost:3000");
});