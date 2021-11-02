const mongoose = require("mongoose");
require("mongoose-type-url");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  company: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  website: {
    type: mongoose.SchemaTypes.Url,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
      },
      company: {
        type: String,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        require: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      desc: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
      },
      degree: {
        type: String,
      },
      fieldofstudy: {
        type: String,
      },
      from: {
        type: Date,
        require: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      desc: {
        type: String,
      },
    },
  ],
  social: {
    linkedin: {
      type: mongoose.SchemaTypes.Url,
    },
    instagram: {
      type: mongoose.SchemaTypes.Url,
    },
    youtube: {
      type: mongoose.SchemaTypes.Url,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
