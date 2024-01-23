const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


// Sample in-memory storage for recipes
let recipes = [];

// GET endpoint to retrieve all recipes
app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

// GET endpoint to retrieve a specific recipe by ID
app.get("/api/recipes/:id", (req, res) => {
  const recipe = recipes.find((r) => r._id === req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ error: "Recipe not found" });
  }
});

// POST endpoint to add a new recipe
app.post("/api/recipes", (req, res) => {
  const newRecipe = {
    _id: String(recipes.length + 1), // You might want to use a better ID generation method
    title: req.body.title,
    body: req.body.body,
  };
  recipes.push(newRecipe);
  res.json(newRecipe);
});

// PUT endpoint to update a specific recipe by ID
app.put("/api/recipes/:id", (req, res) => {
  const index = recipes.findIndex((r) => r._id === req.params.id);
  if (index !== -1) {
    recipes[index].title = req.body.title;
    recipes[index].body = req.body.body;
    res.json(recipes[index]);
  } else {
    res.status(404).json({ error: "Recipe not found" });
  }
});

// DELETE endpoint to delete a specific recipe by ID
app.delete("/api/recipes/:id", (req, res) => {
  recipes = recipes.filter((r) => r._id !== req.params.id);
  res.json({ message: "Recipe deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
