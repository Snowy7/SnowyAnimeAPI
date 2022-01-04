const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const { response } = require("express");
const url = require("url");
const { last } = require("cheerio/lib/api/traversing");
const router = express.Router();

const urls = {
  0: {
    id: 0,
    url: "https://w1.anime4up.com/",
    anime_url: "https://w1.anime4up.com/anime/",
    ep_url: "https://w1.anime4up.com/episode/",
    LatestEps:
      ".page-content-container .episodes-list-content .row div .episodes-card-container",
    latest_Title: ".ep-card-anime-title h3 a",
    latest_img: ".episodes-card-container .episodes-card .img-responsive",
    latest_img_attr: "src",
    latest_number: ".episodes-card .episodes-card-title h3 a",
    latest_anime_needs_attr: true,
    latest_anime_url: ".ep-card-anime-title h3 a",
    latest_anime_url_attr: "href",
    latest_ep_url: ".episodes-card .episodes-card-title h3 a",
    latest_ep_url_attr: "href",
  },
};

router.get("/", async (req, res) => {
  const latest = [];

  await axios(urls["0"]).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    $(urls["0"].LatestEps, html)
      .slice(0, 36)
      .each(function () {
        let id = 0;
        let title = $(this).find(urls["0"].latest_Title).text();
        let number = $(this).find(urls["0"].latest_number).text();
        let image = $(this)
          .find(urls["0"].latest_img)
          .attr(urls["0"].latest_img_attr);
        let ep = $(urls["0"].latest_ep_url).attr(urls["0"].latest_ep_url_attr);
        let url = $(urls["0"].latest_anime_url).text();
        if (urls["0"].latest_anime_needs_attr) {
          url = $(urls["0"].latest_anime_url).attr(
            urls["0"].latest_anime_url_attr
          );
        }
        url = url.replace(urls["0"].anime_url);
        ep = ep.replace(urls["0"].ep_url);
        latest.push({
          id,
          title,
          number,
          image,
          ep,
          url,
        });
      });
  });
  res.send(JSON.stringify(latest));
});

module.exports = router;
