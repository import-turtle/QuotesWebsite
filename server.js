const express = require("express");
const app = express();
const https = require("https");

// set ejs view engine
app.set("view engine", "ejs");

// sends static html/css/js files
app.use(express.static("public"));

app.get("/", function(req,res){
  // request Kanye REST API id="kanyeApiText"
  https.get('https://api.kanye.rest/', (response) => {
    response.on('data', (data) => {
      let quote = JSON.parse(data).quote;
      console.log("Quote of the Day: " + quote);
      res.render("index", {kanyeQuote: quote});
    });
    }).on('error', (e) => {
      console.error(e);
  });

  // https://animechan.vercel.app/api/random

});



// Heroku Port Configuration
var port = process.env.PORT;

if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function () {
  console.log("Server started on port " + port);
});
