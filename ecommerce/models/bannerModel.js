const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
        type: String,
    },
    images: [
    {
        public_id: String,
        url: String,
    },
    ],
    link: {
      type: String,
      required: true,
    }

  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Banner", bannerSchema);
