$(document).ready(function() {
  let orgs = [];

  getOrgsForUser(userId, showOrgs);
  
  function getOrgsForUser(userId, callback) {
    let data = {userId : userId};
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
  
  function showOrgs(data){
    console.log("showing orgs");
    console.log(data);
  }
  
});
