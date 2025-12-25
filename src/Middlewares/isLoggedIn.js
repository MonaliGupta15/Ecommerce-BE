const jwt = require("jsonwebtoken")
const User = require("../Models/User") 


const isLoggedIn = async (req, res, next) => {
  try {
    const { loginToken } = req.cookies

    if (!loginToken) {
      return res.status(401).json({ error: "Please Login first !" })
    }

    const originalObject = jwt.verify(loginToken, process.env.JWT_SECRET)
    const foundUser = await User.findOne({ _id: originalObject.id })

    if (!foundUser) {
      throw new Error("Access Denied")
    }

    req.user = foundUser
    next()

  } catch (error) {
    res.status(401).json({ error: "Please Login first !" })
  }
}

module.exports = {
  isLoggedIn
}
