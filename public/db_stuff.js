$(document).ready(function() {
  console.log("in dbstuff");

  $(".dbtest").click(function() {
    var data = {

    };
    $.post("/userdata", data, function(response, status) {
      console.log("posted");
      console.log(response);
      console.log(status);
    });
  });
});
