const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const { response } = require("express");
const url = require("url");
const { last } = require("cheerio/lib/api/traversing");
const e = require("express");
const router = express.Router();

const urls = {
  0: {
    id: 0,
    url: "https://ww.anime4up.com/",
    anime_url: "https://w1.anime4up.com/anime/",
    anime_img: ".anime-thumbnail",
    anime_img_with_src: true,
    anime_img_attr: "src",
    anime_title:
      ".anime-info-container .anime-info-left .anime-details .anime-details-title",
    anime_title_attr: "",
    anime_title_with_attr: false,
    anime_desc:
      ".anime-info-container .anime-info-left .anime-details .anime-story",
    anime_desc_attr: "",
    anime_desc_with_attr: false,
  },
};

router.post("/", async (req, res) => {
  console.log(req.body);
  const title = req.title;
  const details = {
    img: "",
    title: "",
    description: "",
  };
  const site = urls["0"];
  let url = site.anime_url + "naruto";
  console.log(url);
  await axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      if (site.anime_img_with_src) {
        let img = $(site.anime_img).find("img").attr("src");
        details.img = img;
        console.log(img);
      } else {
        details.img = $(site.anime_img).text();
      }

      if (site.anime_desc_with_attr) {
        details.description = $(site.anime_desc).attr(site.anime_desc_attr);
      } else {
        details.description = $(site.anime_desc).text();
      }

      if (site.anime_title_with_attr) {
        details.title = $(site.anime_title).attr(site.anime_title_attr);
      } else {
        details.title = $(site.anime_title).text();
      }
    })
    .catch((error) => {
      console.log("error: " + error.message);
      res.status(404).send("Error: " + error.message);
    });
  res.send(JSON.stringify(details));
});

module.exports = router;
