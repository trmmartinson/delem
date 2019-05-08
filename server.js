const express = require("express");
const path = require("path");
axios = require ("axios");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
console.log("server");


axios.get("https://www.googleapis.com/books/v1/volumes?q=" + "harry potter")
      .then(res => {
      const books = JSON.stringify("cork" + res.data);
        console.log(res.data.items.length);
        res.data.items.map((book) => {
            console.log(book.volumeInfo.authors);
            console.log(book.volumeInfo.title);
            console.log(book.volumeInfo.imageLinks.thumbnail);
            console.log(book.volumeInfo.previewLink);
            console.log(book.volumeInfo.description);
            console.log("");
        });
      })




app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
