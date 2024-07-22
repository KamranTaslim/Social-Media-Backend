const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

// Validator for alphanumeric password with a minimum length of 6
const passwordValidator = {
  validator: function (value) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value);
  },
  message: (props) =>
    `${props.value} is not a valid password! Password must be at least 6 characters long and alphanumeric.`,
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      validate: passwordValidator,
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      // Validate the password before hashing
      if (!passwordValidator.validator(this.password)) {
        throw new Error(passwordValidator.message({ value: this.password }));
      }

      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
