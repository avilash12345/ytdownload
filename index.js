const express = require('express')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 4000;
const fs = require('fs');
const { dlAudio } = require("youtube-exec");

//middleware
app.use(cors());
app.set("view engine", "ejs");
// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//routes
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/url",async(req, res) => {
  const inputurl=req.body
  //console.log(inputurl.inpurl)
  // Using async/await
try {
 if(inputurl.inpurl){
  await dlAudio({
    url: inputurl.inpurl,
    folder:  'downloads', // optional, default: "youtube-exec"
    filename: Math.random(), // optional, default: video title
    quality: "best", // or "lowest"; default: "best"
  });
 }
  console.log("Audio downloaded successfully! 🔊🎉");
} catch (err) {
  console.error("An error occurred:", err.message);
}
  res.redirect('/');
});
app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
