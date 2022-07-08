const { User } = require("../models");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const listUser = await User.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      res.status(200).send(listUser);
    } else {
      const listUser = await User.findAll({});
      res.status(200).send(listUser);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailUser = async (req, res) => {
  const { id } = req.params;
  try {
    const detail = await User.findOne({
      where: {
        id,
      },
    });
    res.status(200).send(detail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, isAdmin, img, phone, country } =
      req.body;
    const salt = bcrypt.genSaltSync(10);
    //ma hoa salt + password
    const hashPassword = bcrypt.hashSync(password, salt);
    await User.update(
      {
        username,
        email,
        password: hashPassword,
        isAdmin,
        img,
        phone,
        country,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send(`ID :${id} updated success!`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Delete Success!");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAll,
  getDetailUser,
  updateUser,
  deleteUser,
};
