console.log("About to start a server");

import express from "express";
import serveIndex from "serve-index";
import api from "./api";

const app = express();
const port = +(process.env.GSTOCK_PORT || 3000);
const publicDir = "../front/dist";

app.use((req, res, next) => {
  console.log("req: ", req.method, req.url);
  next();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/api", api);

app.use(express.static(publicDir));
app.use(serveIndex(publicDir, { icons: true }));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: publicDir });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
