const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

  // Read the JWT access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) 
    return res.status(401).json({ errors: [{ msg: 'No token, authorisation denied' }] }); 
  
  // convert provided pbase64 pem to plain
  // Look in get-started -> tokens in UserFront for key 
  const secret = Buffer.from(process.env.USERFRONT_PUBLIC_KEY, 'base64');

  try {
    // decode token with secret key
    const decoded = jwt.verify(token, secret, { algorithms: ["RS256"] });
    req.auth = decoded;
    req.user = extractIdToken(req);

    // execute callback
    next();
  } catch (err) {
    res.status(403).json({ errors: [{ msg: 'Token is not valid' }] });
  }
};

// Read the JWT ID token from userFront to get 
// user details like name, roles etc.
function extractIdToken(req) {    
    const token = req.header("x-uf-idToken");
    if (token == null) 
      return null;
    
    const secret = Buffer.from(process.env.USERFRONT_PUBLIC_KEY, 'base64');  
    try {
      const decoded = jwt.verify(token, secret, { algorithms: ["RS256"] });
      return decoded;
    } catch (err) {
      return null;
    }
};