/*
we're using this json editor:
https://github.com/json-editor/json-editor
*/

$(document).ready(function() {
  var orgs_data = {};

  let initted = false;

  

  var editor_options = {
    schema: schema,
    ajax: true,
    theme: "bootstrap4",
    iconlib: "spectre",
    disable_edit_json: true,
    disable_properties: true
  };

  // get thingss running

  
  if (userId && userId.trim() !== "") {
    getOrgsForUser(userId, setupEditor);
  } else {
    $("#editors").html("Looks like you're not logged in? " + userId);
  } 

  function getOrgsForUser(userId, callback) {
    let data = { userId: userId };
    console.log("getting orgs for user " + userId);
    $.get("/adminOrgForUser", data, function(response, status) {
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

  let prevdata = {};

  function setupEditor() {
    console.log("setting up editors");
    if(!orgs_data || orgs_data.length == 0){
        $("#editors").html("Looks like you're not the admin for any orgs.");
    }

    $.each(orgs_data, function(index, org_data) {
      console.log("making editor for org");
      console.log(org_data);
      careerPathAlignmentToArray(org_data);
      console.log(org_data);
      console.log("***********************");
      let element = $("<div class='orddata_editor'></div>");
      $("#editors").append(element);

      editor_options.startval = org_data;

      let editor = new JSONEditor($(element)[0], editor_options);
      console.log("editor created");
      console.log(editor);

      editor.on("change", function() {
        editorChanged(editor, index);
      });
      
      editor.on('addRow', subeditor => {
        // when a new careerPath is added, we want to populate it with default values, defined in schema.js
        console.log('addRow', subeditor);
        console.log(subeditor.path);
        
        // the path is root.dataset.careerPaths.NUMBER , and nothing beyond that
        if(subeditor.path.match(/^root.dataset.careerPaths.[0-9]+$/)){        
          let value = subeditor.getValue();
          var toAdd = defaultCareerPathGroups; // this is defined in schemas.js
          value.groups = toAdd;
          subeditor.setValue(value);
        }
      });      
    });
  }
  
  function editorChanged(editor, index) {
    // Do something
    console.log("editor values changed ");
    let orgdata = editor.getValue();
    if (prevdata[index] && !deepEqual(orgdata, prevdata[index])) {
      prevdata[index] = orgdata;
      let reveditor = editor.getEditor("root._rev");
      saveOrg(orgdata, reveditor, function() {});
    } else {
      prevdata[index] = orgdata;
    }
  }

  function saveOrg(org, reveditor, callback) {
    console.log("saving");
    processMessage("saving data...");
    $.post("/org", org, function(response, status) {
      processMessage("Saved!");
      setTimeout(closeMessageWindow, 3000);
      console.log("new org data posted");
      console.log(response);
      let rev = response.rev;
      org._rev = rev;
      reveditor.setValue(rev);

      console.log(status);
      if (callback) {
        callback();
      }
    });
  }

  function careerPathAlignmentToArray(org_data) {
    //org_data.dataset.groups[].competencies[].careerPathAlignment
    $.each(org_data.dataset.groups, (index, group) => {
      $.each(group.competencies, (index, competency) => {
        console.log("careerPathAlignment");
        console.log(competency.careerPathAlignment);
        let careerPathAlignmentArray = [];
        let keys = Object.keys(competency.careerPathAlignment);
        $.each(keys, (index, key) => {
          let obj = competency.careerPathAlignment[key];
          obj.label = key;
          careerPathAlignmentArray.push(obj);
        });
        competency.careerPathAlignmentArray = careerPathAlignmentArray;
      });
    });
  }

  function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (key === "_rev") {
        continue;
      }
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        (areObjects && !deepEqual(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        console.log(key + " : " + val1 + " : " + val2);
        return false;
      }
    }

    return true;
  }

  function isObject(object) {
    return object != null && typeof object === "object";
  }
});
