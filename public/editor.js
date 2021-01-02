$(document).ready(function() {
  var orgs_data = {};

  var schema = {
    type: "object",
    properties: {
      name: {
        title: "FullName",
        $ref: "#/definitions/name"
      }
    },
    definitions: {
      name: {
        type: "string",
        minLength: 5
      }
    }
  };

  var editor_options = { schema: schema, ajax: true, theme: "bootstrap4" };

  // get thingss running

  getOrgsForUser(userId, setupEditor);

  function getOrgsForUser(userId, callback) {
    let data = { userId: userId };
    console.log("getting orgs for user " + userId);
    $.get("/orgForUser", data, function(response, status) {
      console.log("got orgs");
      orgs_data = response;
      console.log(response);
      console.log(status);
      if (callback) {
        callback(response);
      } else {
        console.log("no callback");
      }
    });
  }

  function setupEditor() {
    console.log("setting up editors");

    $.each(orgs_data, function(index, org_data) {
      console.log("making editor for org");
      console.log(org_data);
      
      let element = $("<div class='orddata_editor'></div>");
      $("#editors").append(element);

      let editor = new JSONEditor($(element)[0], editor_options);

      // can set entire document here
//      editor.setValue({ FullName: "John Smith "+ index });
      editor.setValue(org_data);

      let value = editor.getValue();
    });
  }
});
