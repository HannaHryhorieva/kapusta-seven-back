const { BadRequest, Unauthorized, Forbidden } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../model");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest(`User with this email: ${email}, was not found!`);
  }
  const compareResult = bcrypt.compareSync(password, user.password);
  if (!compareResult) {
    throw new Unauthorized("Password wrong");
  }
  if (!user.verify) {
    throw new BadRequest("Not Verified");
  }
  if (user.isGoogle) {
    throw new Forbidden(
      "Login failed. Please sign in with your Google account"
    );
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  await User.findByIdAndUpdate(user._id, { token });
  const { _id, name, balance, picture, date, verify } = user;
  res.json({
    status: "Success",
    code: 200,
    data: {
      token,
      user: {
        id: _id,
        date,
        email: user.email,
        name,
        balance,
        picture,
        verify,
      },
    },
  });
};

module.exports = login;
