// ref: https://scotch.io/tutorials/easy-node-authentication-setup-and-local
/*
    a user has:
    - an organization
    - a role in that org (superadmin (can create admins), admin, user)
    - for each careerPath in that org (or as many as they pick)
    -- their own score for each of the skills
    -- the score Gap to the idealScore (calculated against the orgs idealScore at display time)
    -- 

*/

module.exports = function(db) {
  var userModel = {
    foo: "bar",
    userDoc: false,

    addonData: {
      type: "user",    
      org: false,
      dataset: false,
      role: "user" // user, admin, superadmin
    },


    update: function(id, user, callback) {
      db.put(user)
        .then(function(response) {
          if (callback) {
            callback(response);
          }
          // handle response
        })
        .catch(function(err) {
          console.log("error in updating" + err);
        });
    },    
    
    
    findOrCreate: function(id, user, callback) {
      console.log("in findOrCreate: " + id);
      user = {...this.addonData, ...user};
      db.get(id)
        .then(function(doc) {
          // handle doc
          console.log("found");
          console.log(doc);
          this.userDoc = doc;
          callback(null, doc);
        })
        .catch(function(err) {
          console.log("error : not found, adding");
          console.log(err);
          console.log(user);
          db.put(user)
            .then(function(docOut) {
              console.log("created");
              console.log(user);
              this.userDoc = user;
              callback(null, user);
            })
            .catch(function(err) {
              console.log("error in putting");
              console.log(err);
            });
        });
    }
  };

  return userModel;
};
