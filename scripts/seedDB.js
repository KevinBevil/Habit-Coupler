const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Habits collection and inserts the Habits below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist"
);

const habitSeed = [
  {
    habitname: "Using The Bathroom"
  },
  {
    habitname: "Making Coffee"
  },
  {
    habitname: "Putting On Clothes"
  },
  {
    habitname: "Taking Pets Out"
  },
  {
    habitname: "Checking Your Phone"
  },
  {
    habitname: "Preparing Breakfast"
  },
  {
    habitname: "Getting Purse/Wallet"
  },
  {
    habitname: "Brushing Teeth"
  },
  {
    habitname: "Flossing"
  },
  {
    habitname: "Preparing Dinner"
  },
  {
    habitname: "Eating Lunch"
  },
  {
    habitname: "Heading To Bed"
  }
];

const userSeed = [
  {
    username: "Mr Firstman",
    email: "num1@netscape.net",
    habits: ["Flossing", "Eating Lunch", "Getting Purse/Wallet", "Preparing Breakfast"]
  }
];

db.Habit.remove({})
  .then(() => db.Habit.collection.insert(habitSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  db.User.remove({})
  .then(() => db.User.collection.insert(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });