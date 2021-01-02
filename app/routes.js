module.exports = function(app, passport, db) {
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: true, failureRedirect: "/app" }),
    function(req, res) {
      console.log("redirectxing?");
      console.log(req.user);
      req.user.foo = "nerd";
      // Successful authentication, redirect home.
      res.redirect("/app");
    }
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );

  app.get("/app/privacy.html", (request, response) => {
    response.sendFile(__dirname + "/../views/privacy.html");
  });
  app.get("/app/tos.html", (request, response) => {
    response.sendFile(__dirname + "/../views/tos.html");
  });
  app.get("/app/admin.html", (request, response) => {
    response.render(__dirname + "/../views/admin.html", { user: request.user });
  });
  app.get("/app/editor.html", (request, response) => {
    response.render(__dirname + "/../views/editor.html", {
      user: request.user
    });
  });

  app.get("/app/superadmin.html", (request, response) => {
    /*
    get all the data you need
    */
    response.render(__dirname + "/../views/superadmin.html", {
      user: request.user
    });
  });

  // https://expressjs.com/en/starter/basic-routing.html
  app.get("/app", (request, response) => {
    console.log(request.user);
    response.render(__dirname + "/../views/index.html", { user: request.user });
  });

  // send the default array of dreams to the webpage
  /*
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});
*/

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/app");
  });

  app.post("/userdata", function(req, res) {
    console.log("posting userdata");
    console.log(req.body);
    console.log(req.user);
    //    console.log(req.session);
    res.send("POST request returned to the homepage");
  });

  app.get("/orgs", function(req, res) {
    let options = { include_docs: true };
    console.log("Getting all docs");
    db.allDocs(options)
      .then(function(result) {
        // handle result
        console.log("got all docs");
        console.log(result.rows);
        let orgs = result.rows.filter(row => row.doc.type === "org");
        orgs = orgs.map(org => org.doc);
        console.log("got orgs");
        console.log(orgs);
        res.send(orgs);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.delete("/org", function(req, res) {
    console.log("deleting " + req.query.id);
    console.log(req.params);
    db.get(req.query.id).then(function(doc) {
      res.send("done");
      return db.remove(doc);
    });
  });

  app.get("/users", function(req, res) {
    let options = { include_docs: true };
    console.log("Getting all users");
    db.allDocs(options)
      .then(function(result) {
        // handle result
        console.log("got all docs");
        console.log(result.rows);
        let users = result.rows.filter(row => row.doc.type === "user");
        users = users.map(user => user.doc);
        console.log("got users");
        console.log(users);
        res.send(users);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.get("/orgForUser", function(req, res) {
    // get org(s) that a user is the admin of
    let options = { include_docs: true };
    console.log("Getting org for user");
    let userId = req.query.userId;
    if (!userId) {
      res.send({});
      return;
    }

    db.allDocs(options)
      .then(function(result) {
        // handle result
        console.log("got all docs");
        let orgs = result.rows.filter(
          row => row.doc.type === "org" && row.doc.admin.id === userId
        );
        orgs = orgs.map(org => org.doc);
        console.log("got orgs");
        console.log(orgs);
        res.send(orgs);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.post("/org", function(req, res) {
    console.log("posting orgdata");
    //add orgdata if name not taken
    console.log(req.body);
    var OrgModel = require("./../app/models/org.js")(db);
    if (req.body._id) {
      console.log("updating");
      // then update existing record
      OrgModel.update(req.body._id, req.body, function(result) {
        res.send(result);
      });
    } else {
      var id = req.body.name;
      req.body._id = id;
      OrgModel.findOrCreate(id, req.body, function(message, org) {
        res.send(org);
      });
    }
  });
};
