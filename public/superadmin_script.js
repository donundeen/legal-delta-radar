/*
SuperAdmin can:
create organizations
make people the admins of organizations

*/
$(document).ready(function() {
  let allUsers = [];

  //  getUsers(populateAdminSelect);
  if (userId && userId.trim() !== "") {
    renderPage();
  } else {
    $(".allcontent").hide();
  }
  
  
  
  function renderPage() {
    getUsers(() => {
      getOrgs(showOrgs);
    });
  }

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

  function populateAdminSelect(users, selectedUser, context) {
    console.log("admin select");
    console.log(selectedUser);
    $(users).each((index, user) => {
      console.log("appending option");
      console.log(user);
      let row = $(
        "<option value='" +
          user._id +
          "'>" +
          user.displayName +
          "(" +
          user._id +
          ")</option>"
      );
      if (selectedUser.id === user._id) {
        $(row).attr("selected", "selected");
      }
      $(".adminSelect", context).append(row);
    });
  }

  function populateAddUserSelect(users, context) {
    console.log("addUser select");
    $(users).each((index, user) => {
      if (user.org && user.org !== "false") {
        return true;
      }
      console.log("appending option");
      console.log(user);
      let row = $(
        "<option value='" +
          user._id +
          "'>" +
          user.displayName +
          "(" +
          user._id +
          ")</option>"
      );
      $(".addUser", context).append(row);
    });
  }

  function populateMemberList(users, org, context) {
    $(users).each((index, user) => {
      if (user.org === org._id) {
        let userli = $(
          "<li><span class='membername'></span><button class='removeMember'>Remove</button></li>"
        );
        $(".orguserslist", context).append(userli);
        userli
          .find(".membername")
          .text(user.displayName + " (" + user._id + ")");
        $(".removeMember", userli).click(function() {
          user.org = false;
          $.post("/user", user, function(response, status) {
            console.log("user membership updated");
            console.log(response);
            console.log(status);
            user._rev = response.rev;
            console.log(allUsers);

            renderPage();
          });
        });
      }
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
      // loop through all the orgs
      console.log($("#orgInList").html());
      let row = $($("#orgInList").html()); //get the template for orgs in the list, create a new element based on it
      // get the elements's data-text value,
      // get the value with that key from the org object,
      //then put that value in the element with that data-text value
      console.log(row);
      // $(row).text(org[$(row).data("text")]+"xxx");
      console.log($(row).find("[data-text]").length);
      $(row)
        .find("[data-text]") // find all the elements with data-text attributes,
        //and populate them with properties from the org array with the name in data-text
        .each((index2, thing) => {
          console.log(thing);
          $(thing).text(org[$(thing).data("text")]);
        });

      // display the admin name if it's set
      if (org.admin.displayName) {
        $(".adminName", row).text(org.admin.displayName);
      }

      // listen for click to delete the org (TODO: add a confirmation popup)
      $(".deleteorg", row).click(function() {
        confirm(
          "Are you sure you want to delete the organization " + org._id + "?",
          function() {
            console.log("deleting org" + org._id);
            deleteOrg(org._id);
          }
        );
      });

      // listen for the click to create a new admin
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
          renderPage();
        });
      });

      // add a user to this org, by setting the org value for this user's record
      $(".addUserButton", row).click(function() {
        console.log("add User clicked");
        let userid = $(".addUser option:selected", row).val();
        console.log(userid);
        if (!userid || userid.trim() === "") {
          return false;
        }
        let user = allUsers.filter(user => {
          return user._id === userid;
        })[0];
        console.log(user);
        console.log(org._id);
        user.org = org._id;
        $.post("/user", user, function(response, status) {
          console.log("user membership updated");
          console.log(response);
          console.log(status);
          user._rev = response.rev;
          console.log(allUsers);
          renderPage();
        });
        return false;
      });

      $(".orgList").append(row);
      populateMemberList(allUsers, org, row);
      populateAdminSelect(allUsers, org.admin, row);
      populateAddUserSelect(allUsers, row);
    });
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

  function confirm(message, callback) {
    $("#modalText").text(message);
    $("#myModal").modal("show");
    $("#SubForm").on("click", function() {
      $("#SubForm").off("click");
      callback();
      $("#myModal").modal("hide");
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
