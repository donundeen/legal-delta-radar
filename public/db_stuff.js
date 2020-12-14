$(document).ready(function() {
  console.log("in dbstuff");

  $(".dbtest").click(function() {
    var data = {
      foo: "bar",
      structured: {
        cat: "good",
        piggy: "scared"
      }
    };
    $.post("/userdata", data, function(response, status) {
      console.log("posted");
      console.log(response);
      console.log(status);
    });
  });
});
