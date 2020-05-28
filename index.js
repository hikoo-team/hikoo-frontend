"use strict";

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

const proxyConf = require("./hikoo.proxy.conf.json");

const port = 8080;

app.use(express.static('dist/hikoo-frontend'));
app.use(
  "/",
  createProxyMiddleware({
    target: proxyConf.url,
    changeOrigin: true
  })
);

app.listen(port, () => console.log(`Web server on http://localhost:${port}`));
