require("./index.js");
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  ignore: [/(node_modules)/],
});
require("ignore-styles"); // Ignore CSS imports

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./config/db.js"); // Import the database connection
const path = require("path");
//const { fileURLToPath } = require("url");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes.js");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const fs = require("fs");
const {StaticRouter} = require("react-router-dom");
const App = require("../frontend/src/App.jsx").default;
const doctorsRoutes = require("./routes/infoRoutes.js");



dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());


//const __dirname = path.resolve();

//app.use(express.static(path.resolve("frontend", "dist")));

/*const homeHTML = ReactDOMServer.renderToString(React.createElement(Home));
app.get("/", (req, res) => {
fs.readFile(path.resolve("../frontend/"))
  res.send(`
      <html>
        <head><title>My App</title></head>
        <body>
          <div id="root">${homeHTML}</div>
        </body>
      </html>
  `);
});*/

console.log("yooo")
app.get("/", (req, res) => {
  console.log("========")
  const context = {};
  console.log("App Component:", App);
  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  console.log("=======33333=========")

  const indexFile = path.resolve("../frontend/dist/index.html");
  console.log("================")
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error loading index file");
      return res.status(500).send("Internal Server Error");
    }
    return res.send(data.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`));
  });
});

app.use(express.static(path.resolve("../frontend/dist")));
/*app.get("*", (req, res) => {
  const homeHTML = ReactDOMServer.renderToString(React.createElement(Home));

  fs.readFile(path.resolve("frontend", "dist", "index.html"), "utf8", (err, data) => {
    if (err) {
      console.error("Error reading index.html:", err);
      return res.status(500).send("Error loading page");
    }

    // Inject SSR-rendered HTML into the root div
    const finalHTML = data.replace('<div id="root"></div>', `<div id="root">${homeHTML}</div>`);
    res.send(finalHTML);
  });
});





/*app.use(express.static(path.join(__dirname, "../frontend/dist/index.html")));
app.get("/", (req, res) => {
  const indexFile = path.resolve(__dirname, "../frontend/dist/index.html");
  console.log("=======33333=========")
 
  fs.readFile(indexFile, "utf-8", (err, data) => {
    console.log("================")
    if (err) {
      console.error("Error reading index.html:", err);
      return res.status(500).send("Some error happened");
    }

    // Render the React component to HTML string
    const homeHTML = ReactDOMServer.renderToString(React.createElement(Home));
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${homeHTML}</div>`)
    );
  });
});*/


app.use("/api/auth" , authRoutes);
app.use('/api/doctors', doctorsRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
