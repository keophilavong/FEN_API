//import config env
const config = require('../config/index');

//import user model for check id
const User = require('../models/User/user');

//import passport library
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (!user) {
        return done(new Error('ບໍ່ພົບຜູ້ໃຊ້ໃນລະບົບ'), null); //parameter ໂຕແລກແມ່ນ error message ແລະ ໂຕທິສອງ ແມ່ນ user
      }

      return done(null, user); //parameter ໂຕແລກແມ່ນ error message ແລະ ໂຕທິສອງ ແມ່ນ user
    } catch (error) {
      done(error); // done ແມ່ນຄືກັບ next (express) ແຕ່ໃນ passport.js ແມ່ນໃຊ້ done
    }
  })
);

module.exports.isLogin = passport.authenticate('jwt', { session: false });
