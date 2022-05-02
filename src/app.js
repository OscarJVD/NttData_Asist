require("dotenv").config();
const express = require('express')
const app = express()
const path = require('path')
const port = 3411
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const liveReloadServer = livereload.createServer({});
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.get('/api', (req, res) => res.send('Welcome the API'))
app.use("/static", express.static(__dirname + "/assets"));
app.use("/code", express.static(__dirname + "/code"));
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, './')
  })
})

app.use("/api", require("./api"));
app.listen(process.env.PORT || port, () => console.log(`App listening on port http://localhost:${process.env.PORT || port} `))
