/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// reading the json file and storing it in restaurantData
let restaurantData = JSON.parse(
  fs.readFileSync("./data/resturantData.json", "utf-8")
);

app.get("/api/restaurants", (req, res) => {
  res.json(restaurantData);
});

app.post("/api/restaurants/addData", (req, res) => {
  const newRestaurant = req.body;
  restaurantData.push(newRestaurant);
  // adding the data to json file which was sent form frontend
  fs.writeFileSync(
    "./data/resturantData.json",
    JSON.stringify(restaurantData, null, 2)
  );
  res.status(201).json({ message: "Restaurant added successfully" });
});

app.delete("/api/restaurants/delete/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < restaurantData.length) {
    // Remove the restaurant data by the reference of the index number
    restaurantData.splice(index, 1);
    // Save data back to JSON file
    fs.writeFileSync(
      "./data/resturantData.json",
      JSON.stringify(restaurantData, null, 2)
    );
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

app.put("/api/restaurants/edit/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < restaurantData.length) {
    const updatedRestaurant = req.body;
    restaurantData[index] = updatedRestaurant;
    // Save data back to JSON file
    fs.writeFileSync(
      "./data/resturantData.json",
      JSON.stringify(restaurantData, null, 2)
    );
    res.status(200).json({ message: "Restaurant updated successfully" });
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
