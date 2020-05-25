"use strict";

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

const proxyConf = require("./hikoo.proxy.conf.json");

const port = 8080;

app.use(express.static('dist/hikoo-frontend'));
app.use(
  "/api",
  createProxyMiddleware({
    target: proxyConf.url,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/",
    },
  })
);

app.listen(port, () => console.log(`Web server on http://localhost:${port}`));
