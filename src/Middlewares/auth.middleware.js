import JWT from 'jsonwebtoken';
export function authMiddleware(req, res, next) {
  try {
    const token = req.headers['authorization'].split(" ")[1]
    const JWT_SEC = 'XYZGHS123'
    JWT.verify(token, JWT_SEC, (err, decode) => {
      if (err) {
        return res.json({ success: false, message: `Authentication Failed : ${err}` })
      } else {
        req.body.userId = decode.id
        next();
      }
    })
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Authentication Failed", result: error })
  }

}
