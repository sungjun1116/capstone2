var express = require("express");
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { myVar: "Express" });
});

router.post("/", function (req, res, next) {
  const { lat, lng } = req.body;
  if (lat !== undefined && lng !== undefined) {
    console.log(`현재 위도: ${lat}`);
    console.log(`현재 경도: ${lng}`);
    let description = `var x = ${lat}; var y = ${lng}`;
    fs.writeFile(`./public/data/gps.js`, description, "utf8", function (err) {
      if (err === null) {
        console.log("Get GPS success");
        return res.json({
          isSuccess: true,
          code: 2000,
          message: "위치 입력 성공",
        });
      } else {
        throw err;
      }
    });
  } else {
    let description = `var x = 37.322964; var y = 127.127272`;
    fs.writeFile(`./public/data/gps.js`, description, "utf8", function (err) {
      if (err === null) {
        console.log("Get GPS success");
      } else {
        throw err;
      }
    });
  }
});

module.exports = router;
