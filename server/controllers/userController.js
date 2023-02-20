const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;
  //   res.send(req.body)
  if (!name || !email || !password) {
    res.status(400).send("Enter all Fields");
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400).send("User already Exist");
    return;
  }
  const hashedPass = bcrypt.hashSync(password, 12);
  //   res.send(hashedPass)
  const user = await User.create({
    name,
    email,
    password: hashedPass,
    pic,
  });
  //   res.send(user)
  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.SECRET,
    { expiresIn: "15d" }
  );
  if (user) {
    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(400).send("user not found");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(404).send("No Existing User.. please Sign Up");
  }
  const isPassCorr = await bcrypt.compare(password, existingUser.password);
  if (!isPassCorr) {
    res.status(400).send("invalid password");
  }
  const token = jwt.sign({ email, _id: existingUser._id }, process.env.SECRET, {
    expiresIn: "15d",
  });
  res.status(200).send({
    email,
    name: existingUser.name,
    _id: existingUser._id,
    pic: existingUser.pic,
    isAdmin: existingUser.isAdmin,
    token,
  });
};
const allUser = async (req, res) => {
  const users = await User.find({
    $or: [
      { name: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ],
  });
  res.send(users);
};
module.exports = { registerUser, loginUser, allUser };
