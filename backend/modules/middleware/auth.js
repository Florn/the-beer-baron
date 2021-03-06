const { verifyJWTToken } = require("../auth/authorise");

const verifyJWT_MW = (req, res, next) => {
  let token = req.method === "POST" ? req.body.token : req.query.token;

  verifyJWTToken(token)
    .then(decodedToken => {
      req.user = decodedToken.data;
      next();
    })
    .catch(err => {
      res.status(400).json({ message: "Invalid auth token provided." });
    });
};

module.export = verifyJWTToken;
