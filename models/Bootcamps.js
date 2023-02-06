const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
const validator = require("validator");

const BootcampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can't be more than 50 charaters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add a discription"],
      maxlength: [500, "Discription can't be more than 500 charaters"],
    },
    website: {
      type: String,
      validate: [validator.isURL, "Please use a valid URL with HTTp or HTTPS"],
    },
    phone: {
      type: String,
      maxlength: [20, "Mobile number can't be more than 20 characters"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please add a valid emails"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    careers: {
      type: [String],
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Other",
      ],
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating must be less than equal to 10"],
    },
    averageCost: {
      type: Number,
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

BootcampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//Cascade Delete courses when a bootcamp is deleted
BootcampSchema.pre("remove", async function (next) {
  console.log("dfsdf");
  await this.model("Course").deleteMany({ bootcamp: this._id });
  next();
});

//Reverse populate with populate
BootcampSchema.virtual("course", {
  ref: "Course",
  localField: "_id",
  foreignField: "bootcamp",
  justOne: false,
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);
