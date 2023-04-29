const mongoose = require("mongoose");

// {
//     _id: ObjectId,
//     name: String,
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       country: String,
//       zip: String
//     },
//     menu: [{
//       _id: ObjectId,
//       name: String,
//       description: String,
//       price: Number,
//       image: String
//     }]
//   }

const resturantSchema = mongoose.Schema({
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  menu: [
    {
       
      name: String,
      description: String,
      price: Number,
      image: String,
    },
  ],
});

const resturantModel = mongoose.model("resturant", resturantSchema);

module.exports = {
  resturantModel,
};
