const admin = require('./firebase');

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await admin.auth.createUser({ email, password });
  return res.send(user);
};

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }

  next();
};

exports.checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (err) {
      return res.status(401).send({ error: 'not authorized' });
    }
  });
};
