/*
SuperAdmin can:
create organizations
make people the admins of organizations

*/
$(document).ready(function() {
  let allUsers = [];
  getOrgs(showOrgs);
  //  getUsers(populateAdminSelect);

  function getUsers(callback) {
    $.get("/users", {}, function(response, status) {
      console.log("got users");
      console.log(response);
      console.log(status);
      allUsers = response;
      if (callback) {
        callback(response);
      }
    });
  }

  function populateAdminSelect(users) {
    $(users).each((index, user) => {
      console.log("appending option");
      let row = $(
        "<option value='" + user._id + "'>" + user.displayName + "<option>"
      );
      $(".adminSelect").append(row);
    });
  }

  function getOrgs(callback) {
    $.get("/orgs", {}, function(response, status) {
      console.log("posted");
      console.log(response);
      console.log(status);
      if (callback) {
        callback(response);
      }
    });
  }

  function showOrgs(orgs) {
    console.log("showing orgs?");
    $(".orgList").empty();
    console.log(orgs);
    $(orgs).each((index, org) => {
      console.log($("#orgInList").html());
      let row = $($("#orgInList").html());
      $(row).text(org[$(row).data("text")]);
      $(row)
        .find("[data-text]")
        .each((index2, thing) => {
          $(thing).text(org[$(thing).data("text")]);
        });
      if (org.admin.displayName) {
        $(".adminName", row).text(org.admin.displayName);
      }
      $(".deleteorg", row).click(function() {
        console.log("deleting org" + org._id);
        deleteOrg(org._id);
      });
      $(".setAdmin", row).click(function() {
        console.log("setting org admin" + org._id);
        let username = $(".selectAdmin option:selected", row).text();
        let userid = $(".selectAdmin option:selected", row).val();
        console.log(username + " : " + userid);
        org.admin = { displayName: username, id: userid };
        $.post("/org", org, function(response, status) {
          console.log("posted");
          console.log(response);
          console.log(status);
          getOrgs(showOrgs);
        });
      });

      $(".orgList").append(row);
    });
    getUsers(populateAdminSelect);
  }

  function deleteOrg(id) {
    console.log("deleting org " + id);
    $.ajax({
      url: "/org?id=" + id,
      type: "DELETE",
      success: function(result) {
        console.log("got result " + result);
        getOrgs(showOrgs);
      }
    });
  }

  $(".addorg").click(function() {
    console.log("addorg clicked");

    var data = {
      name: $(".neworgname").val(),
      foo: "bar",
      structured: {
        cat: "good",
        piggy: "scared"
      }
    };
    $.post("/org", data, function(response, status) {
      console.log("posted");
      console.log(response);
      console.log(status);
      getOrgs(showOrgs);
    });
  });
});
