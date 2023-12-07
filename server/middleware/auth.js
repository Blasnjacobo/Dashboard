import jwt from 'jsonwebtoken'
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization')
    console.log(token)
    //* From the request in the frontend we are grabbing the authorization header and thats where the token will be setting, then we can grab it in the backend and throw this key
    if (!token) {
      return res.status(403).send('Access Denied')
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft()
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
