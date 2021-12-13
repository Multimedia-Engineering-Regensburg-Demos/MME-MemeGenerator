import express from "express";
import CatApiClient from "./lib/CatApiClient.js";

const PORT = process.argv[2],
  app = express();


app.get("/random", (request, response) => {
  CatApiClient.getRandomImageURL().then((url) => {
    response.send(url);
  });
});
app.use("/images", express.static("images"));
app.use(express.static("app"));

app.listen(PORT);