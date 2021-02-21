const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    await user.save();
    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      process.env.JWT_KEY
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await User.find({ email });
    if (!user || password.localeCompare(user.password)) {
      return res.status(401).json({ message: "Auth faild" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      process.env.JWT_KEY
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports = { signup, login };
