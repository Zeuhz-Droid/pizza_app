const passport = require('passport');
const auth0Strategy = require('passport-auth0');
const UserModel = require('../models/userModel');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// passport.use('/login');

// passport.use(
//   new JWTStrategy(
//     {
//       secretOrKey: process.env.JWT_SECRET,
//       jwt: ExtractJWT.fromUrlQueryParameter('aval_token'),
//     },
//     async (token, next) => {
//       try {
//         return next(null, token.user);
//       } catch (err) {
//         next(err);
//       }
//     }
//   )
// );

const strategy = new auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    return done(null, profile);
  }
);

passport.use(strategy);
