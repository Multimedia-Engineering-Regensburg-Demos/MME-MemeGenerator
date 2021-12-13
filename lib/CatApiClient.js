import https from "https";
import Stream from "stream";
import fs from "fs";

const API_URL = "https://api.thecatapi.com/v1/images/search",
  DOWNLOAD_FOLDER = "images";

function downloadImage(url, target) {
  return new Promise(function(resolve, reject) {
    https.get(url, res => {
      let data = new Stream.Transform();

      res.on("data", chunk => {
        data.push(chunk);
      });

      res.on("end", () => {
        fs.writeFileSync(target, data.read());
        resolve();
      });
    });
  });
}

function getImage() {
  return new Promise(function(resolve, reject) {
    https.get(API_URL, res => {
      let data = [];

      res.on("data", chunk => {
        data.push(chunk);
      });

      res.on("end", () => {
        let result = JSON.parse(data);
        resolve(result[0]);
      });
    });
  });

}

class CatApiClient {

  async getRandomImageURL() {
    let image = await getImage(),
      fileName = `${image.url.substring(image.url.lastIndexOf("/")+1)}`;
    await downloadImage(image.url, `${DOWNLOAD_FOLDER}/${fileName}`);
    return `${DOWNLOAD_FOLDER}/${fileName}`;
  }

}

export default new CatApiClient();