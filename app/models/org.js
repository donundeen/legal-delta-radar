/*
1. The ability for employers or law schools to input or choose 
which specific skills they would want to include under each of the three sides of the delta

2. The ability for employers or law schools to then add a numerical value 
that corresponds with the skill-level they find desirable 
for each of those skills (doesn't have to be a number, it could be the sliding lever)

3. A version of the shifting midpoint delta model that the law firms or law schools 
can use to better visualize the relative skill levels required in certain career paths.


an org has:
- an admin or admins
- members
- a list of careerPaths, and for each careerPath:
-- the skills in each group to show. For each skill:
--- the ideal score for that skill/careerPath
--- the "Gap Playlist" for that skill/careerPath

*/

module.exports = function(db) {
  var orgModel = {
    schema: {
      admin: false, // id of admin
      type: "org",
      name: false,
      members: [],
      dataset: false
    },

    update: function(id, org, callback) {
      db.put(org)
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

    findOrCreate: function(id, org, callback) {
      console.log("in org findOrCreate: " + id);
      org = { ...this.schema, ...org };
      db.get(id)
        .then(function(doc) {
          // handle doc
          console.log("found");
          console.log(doc);
          callback(null, doc);
        })
        .catch(function(err) {
          console.log("error : not found, adding");
          console.log(err);
          console.log(org);
          org.dataset = require("./base_dataset.js")(db);
          db.put(org)
            .then(function(docOut) {
              console.log("created");
              console.log(org);
              callback(null, org);
            })
            .catch(function(err) {
              console.log("error in putting");
              console.log(err);
            });
        });
    }
  };

  return orgModel;
};
