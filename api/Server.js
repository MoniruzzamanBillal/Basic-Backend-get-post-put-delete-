const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/UserModel");
const cors = require("cors");

const port = 4000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.wng5cg8.mongodb.net/Test-backend?retryWrites=true&w=majority"
);

app.get("/", (req, res) => {
  res.send("Welcome to my project");
});

// geting data from mongodb database
app.get("/getuser", async (req, res) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

// getting single user data from database based on id
app.get("/getuser/:id", async (req, res) => {
  const userData = await userModel.findById(req.params.id);
  if (!userData) {
    res.status(400);
    throw new Error("could not found");
  }
  res.json(userData);
  res.send(userData);
});

// adding data to mongodb database
app.post("/createuser", async (req, res) => {
  const user = req.body;
  const newUser = new userModel(user);
  await newUser.save();
  res.send(newUser);
});

// updating to database
app.put("/update", async (req, res) => {
  const newAge = req.body.newAge;
  const id = req.body.id;
  try {
    const updateInfo = await userModel.findById(id);
    if (updateInfo) {
      updateInfo.age = newAge;
      await updateInfo.save();
      res.send("Updated successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// deleting from database
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await userModel.findByIdAndRemove(id).exec();
});

app.listen(port, () => {
  console.log(`listening from port ${port}`);
});

// compass
// mongodb+srv://admin:admin@cluster0.wng5cg8.mongodb.net/
