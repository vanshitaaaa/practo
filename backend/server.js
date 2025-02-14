require("./index.js");
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
const Home = require("../frontend/src/pages/Home.jsx").default; 


dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());


//const __dirname = path.resolve();

app.use(express.static(path.resolve("frontend", "dist")));

const homeHTML = ReactDOMServer.renderToString(React.createElement(Home));
app.get("/", (req, res) => {

  res.send(`
      <html>
        <head><title>My App</title></head>
        <body>
          <div id="root">${homeHTML}</div>
        </body>
      </html>
  `);
});

app.use("/api/auth" , authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
