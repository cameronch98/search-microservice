import "dotenv/config";
import express from "express";
import db from "./db.mjs";

// Define port number
const PORT = process.env.PORT;

// Initialize express app and mongo client
const app = express();

// Initializing parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initialize search terms collection
const searchTerms = db.collection("search-terms");

// Add a search term
app.post("/add-search-term", async (req, res) => {
  const search = { searchTerm: `${req.body.search}` };
  const result = await searchTerms.insertOne(search);
  console.log(
    `A new search term was inserted with _id: ${result.insertedId} and searchTerm: ${req.body.search}`
  );
  res.status(201).json(result);
});

// Get all search terms
app.get("/all-search-terms", async (req, res) => {
  const cursor = searchTerms.find();
  let resultsArr = [];
  for await (const doc of cursor) {
    resultsArr.push(doc.searchTerm);
  }
  res.status(200).json({ searchTerms: resultsArr });
});

// Get all matching search terms
app.get("/matching-search-terms", async (req, res) => {
  const query = new RegExp(`^${req.body.search}`);
  const cursor = searchTerms.find({
    searchTerm: { $regex: query },
  });
  let resultsArr = [];
  for await (const doc of cursor) {
    resultsArr.push(doc.searchTerm);
  }
  res.status(200).json({ searchTerms: resultsArr });
});

// Get random search term
app.get("/random-search-term", async (req, res) => {
  const cursor = searchTerms.aggregate([{ $sample: { size: 1 } }]);
  let result = "";
  for await (const doc of cursor) {
    result = doc.searchTerm;
  }
  res.status(200).json({ randomTerm: result });
});

// Have express listen on env port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ...`);
});
