const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    itemID: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
    },
    availability: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    requestQuote: {
      type: String,
    },
    shipping: {
      type: String,
    },
    description: {
      type: String,
    },
    video: {
      type: String,
    },
    images: [
    {
        public_id: String,
        url: String,
    },
    ],
    downloadables: {
      type: String,
    },
    systemIncludes: [
      {
          description: String
      },
    ],
    specifications: [
      {
        title: String,
        description: String
      },
    ],
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
