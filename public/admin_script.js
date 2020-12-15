$(document).ready(function() {
  let orgs = [];

  refreshDisplay();

  function refreshDisplay() {
    getOrgsForUser(userId, showOrgs);
  }

  function getOrgsForUser(userId, callback) {
    let data = { userId: userId };
    console.log("getting orgs for user " + userId);
    $.get("/orgForUser", data, function(response, status) {
      console.log("got orgs");
      console.log(response);
      console.log(status);
      if (callback) {
        callback(response);
      }
    });
  }

  function showOrgs(data) {
    console.log("showing orgs");
    console.log(data);
    $("#orgContainer").empty();

    $(data).each((index, org) => {
      console.log(org);
      var orgdiv = $("#orgtemplate")
        .clone()
        .html();

      orgdiv = $(orgdiv);
      $("#orgContainer").append(orgdiv);
      $(".orgName", orgdiv).text(org.name);
      $(org.dataset.careerPaths).each((index, careerPath) => {
        var li = $("<li class='careerPath'>" + careerPath + "</li>");
        $(".careerPaths", orgdiv).append(li);
        var clickable = $("<span class='deletecareerpath'> <em>(Delete)</em> </span>").appendTo(li);
        
        $(clickable).click(function(){
          var index = org.dataset.careerPaths.findIndex((val) => val === careerPath);
          org.dataset.careerPaths.splice(index, 1);
          saveOrg(org, refreshDisplay);
        });
      });
      $(".newcareerpathsubmit", orgdiv).click(function() {
        let newpath = $(".newcareerpath", orgdiv).val();
        if (newpath && newpath.trim() !== "" && !org.dataset.careerPaths.includes(newpath.trim())) {
          console.log("newpath is " + newpath);
          org.dataset.careerPaths.push(newpath);
          saveOrg(org, refreshDisplay);
        }
      });
    });
  }

  function saveOrg(org, callback) {
    $.post("/org", org, function(response, status) {
      console.log("posted");
      console.log(response);
      console.log(status);
      if (callback) {
        callback();
      }
    });
  }
});
