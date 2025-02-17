/*require("./index.js");
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  ignore: [/(node_modules)/],
});
require("ignore-styles"); // Ignore CSS imports*/

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./config/db.js"); // Import the database connection
//const path = require("path");
//const { fileURLToPath } = require("url");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes.js");
const slotRoutes = require("./routes/slotRoutes.js");
//const React = require("react");
//const ReactDOMServer = require("react-dom/server");
//const fs = require("fs");
//const {StaticRouter} = require("react-router-dom");
//const App = require("../frontend/src/App.jsx").default;
const doctorsRoutes = require("./routes/infoRoutes.js");
const paymentRoutes = require("./routes/payment");




dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());





/*app.get("^/$", (req, res) => {
  
  const context = {};
  console.log("App Component:", App);
  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  

  const indexFile = path.resolve("../frontend/dist/index.html");
  
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error loading index file");
    }
    return res.send(data.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`));
  });
});


app.use(express.static(path.resolve("../frontend/dist")));*/


app.use("/api/auth" , authRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/slots', slotRoutes);
app.use("/api", paymentRoutes);



// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
