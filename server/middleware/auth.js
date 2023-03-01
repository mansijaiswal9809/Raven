import  jwt  from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, process.env.SECRET);
    req.userId = decodedData?._id || decodedData?.id;
    // console.log(req.userId);
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = auth;
