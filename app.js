const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8090;

const categories = require("./database/categories.json");
const cuotes = require("./database/quotes.json");
const shuffle = require("./helpers/shuffle");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect(
    "https://concauth.web.app/?redirect=true&from=https://concauth.onrender.com"
  );
});

app.get("/categories", (req, res) => {
  res.send(categories);
});

app.get("/category/:id", (req, res) => {
  const { id } = req.params;
  if (id.toLocaleLowerCase() === "all") {
    let randomAll = shuffle(cuotes);
    res.send(randomAll);
    return;
  }
  const filtered =
    cuotes.filter((quote) => quote.category_id === id.toLocaleLowerCase()) ||
    [];

  res.send(shuffle(filtered));
});

app.get("/quote/:id", (req, res) => {
  const { id } = req.params;
  if (!id) return res.send({ status: 0, message: "Not Found" });
  const findQuote = cuotes.find((quote) => quote.id === id);
  res.send(findQuote || { status: 0, message: "Not Found" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
