module.exports = function(passport, db) {
  // passport handles authentication things...
  var GoogleStrategy = require("passport-google-oauth20").Strategy;
  var User = require("./../app/models/user.js")(db);

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://delta-pouchdb.glitch.me/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log("in auth function");
        console.log(profile);
        let user = {
          _id: "google4_" + profile.id,
          googleId: profile.id,
          nameParts: profile.name,
          displayName : profile.displayName,
        };

        //        return cb(null, user);

        User.findOrCreate(user._id, user, function(err, userOut) {
          return cb(null, userOut);
        });
      }
    )
  );

  passport.serializeUser(function(user, cb) {
    console.log("serializing");
    console.log(user);
    cb(null, user);
  });

  passport.deserializeUser(function(user, cb) {
    console.log("deserializing");
     console.log(user);

    User.findOrCreate(user._id, user, function(err, userOut) {
      return cb(null, userOut);
    });

//    cb(null, obj);
  });
};
