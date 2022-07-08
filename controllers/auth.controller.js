const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { createError } = require("../utils/error");

const register = async (req, res, next) => {
  const { password } = req.body;
  console.log(req.body);
  console.log("dsadsadsadsa-dsa-d-sa-ds-a-ds-a");
  try {
    //tao ra mot chuoi ngau nhien
    const salt = bcrypt.genSaltSync(10);
    //ma hoa salt + password
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
    });
    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return next(createError(404, "Not Found!"));
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    ); //true or false
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or username"));
      // return next(res.status(400).send({status:404,message:"hello"}))
    }

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      "hiephanguyen01"
    );

    const { password, isAdmin, ...otherDetails } = user.dataValues;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({ details: { ...otherDetails }, isAdmin });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
