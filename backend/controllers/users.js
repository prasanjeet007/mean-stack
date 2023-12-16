const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const userData = new User({
      email: req.body.email,
      password: hash,
    });
    userData
      .save()
      .then((userResult) => {
        res.send(userResult);
      })
      .catch((err) => {
        res.send(err);
      });
  });
};
exports.loginUser = async (req, res, next) => {
  const loginUser = await User.findOne({ email: req.body.email });
  if (loginUser) {
    const loginPass = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );
    if (loginPass) {
      const token = jwt.sign(
        { email: loginUser.email, userId: loginUser._id },
        "userlogindetailstoken",
        {
          expiresIn: "1hr",
        }
      );
      res.status(200).json({
        success: true,
        token: token,
        result: "Authentication Successful",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      result: "Authentication Failed",
    });
  }
};
