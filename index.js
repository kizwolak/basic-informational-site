const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    let filePath = "." + req.url;
    if (filePath === "./") {
      fs.readFile(__dirname + "/index.html", "utf8", (err, data) => {
        if (err) console.error(err);
        else {
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(data);
        }
      });
    } else {
      fs.readFile(__dirname + "/" + filePath, "utf8", (err, data) => {
        if (err) {
          if ((err.code = "ENOENT")) {
            fs.readFile(__dirname + "/404.html", "utf8", (err, data) => {
              res.setHeader("Content-Type", "text/html");
              res.writeHead(200);
              res.end(data);
            });
          }
        } else {
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(data);
        }
      });
    }
  })
  .listen(8080);
