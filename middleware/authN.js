// auth , isStudent , isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    // extract jwt token
    const token = req.body.token;
    //other ways to extract
    // req.cookie.token

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);

      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong , while verifying token",
    });
  }
};


exports.isStudent = (req,res,next) => {
    try{
        if(req.user.role != "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for student"
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "USER role is not matching"
        })
    }
}

exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role != "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin"
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "USER role is not matching"
        })
    }
}