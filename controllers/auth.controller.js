const validator = require("validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

// Create Section
const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Checking required fields
    if (!email || !name || !password)
      throw new Error("Name, email & password is required");

    // Validate email
    if (!validator.isEmail(email)) throw new Error("Invalid email");

    // Validate password
    if (!validator.isStrongPassword(password))
      throw new Error(
        "Password must contain 8+ charecters, lowercase, uppercase, numeric & symbol"
      );

    // Check if the user exists or not
    const isExist = await userModel.findOne({ email });

    if (isExist) throw new Error("Email already in use");

    // Password encryption
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create an user
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login Section
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Required fields
    if (!email || !password) throw new Error("Email and password is required");

    // Check if the user exists or not
    const user = await userModel.findOne({ email });

    if (!user) throw new Error("User not found");

    // Password decryption
    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error("User not found");

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser, loginUser };
