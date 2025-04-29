const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
        type: String,
    },
    longDescription: {
        type: String,
    },
    date: {
        type: String,
    },
    category: {
        type: String,
    },
    images: [
    {
        public_id: String,
        url: String,
    },
    ],
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("News", newsSchema);
