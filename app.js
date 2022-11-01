const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8090;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect(
    "https://concauth.web.app/?redirect=true&from=https://server.com"
  );
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
