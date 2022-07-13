const express = require("express");
require('dotenv').config();
const cors = require('cors')
const router = require("./routes");
const { sequelize } = require("./models/index");
const cookieParser = require("cookie-parser");
const app = express();


//chuyển req, res về json
app.use(express.json());

app.use(cookieParser());
app.use(cors())

app.use("/api", router);

app.listen(process.env.PORT ||3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`Example app listening on port ${port}`);
});

//setup sequelize

// //alter:true  chỉ chỉnh sửa
// //force:true nó sẽ xoá bảng cũ và tạo lại bảng mới
sequelize.sync({ alter: true });
