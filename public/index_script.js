/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console

// some global variables (not gret practice, work on this later)
let curCareerPath = false;
let currentOrg = false;
let currentUser = false;
let allOrgs = false;
let groups = false;

$(document).ready(function() {
  /*
  db.info().then(function(info) {
    console.log(info);
  });  
  
  */

  // this sets up the dependency system, so that some sections can't open until previous sections have been completed.
  setupUIDependencies();

  // setup FlowType (dynamic font size)
  setupFlowType();

  setupAccordion();

  // putting everything together;
  getOrgs(function(orgs) {
    allOrgs = orgs;
    createOrgSelect(orgs, handleOrgSelect);
    if (userId && userId.trim() !== "") {
      setupUser(userId, function(userInfo) {
        currentUser = userInfo;
        /*
        // this sets the org if the user has been added to an org, 
        // but let remove this for now, so any user can access any org
        let orgId = currentUser.org;
        if (orgId && orgId.trim() !== "") {
          setupOrg(orgId, handleOrgSelect);
        }
        */
      });
    } else {
      // handle the "no user" state, when a user hasn't logged in: maybe we need a "blank" user with the minimal structure
      currentUser = {};
    }
  });
});

// get all orgs from DB, and pass to callback function
function getOrgs(callback) {
  $.get("/orgs", function(response, status) {
    console.log("got all orgs");
    console.log(response);
    callback(response);
  });
}

// setup the dropdown for selecting an org
function createOrgSelect(orgs, callback) {
  console.log("createOrgSelect");
  console.log(orgs);
  orgs.forEach(function(org, index) {
    console.log(index);
    let id = org._id;
    let name = org.name;
    $("#selectOrg").append("<option value='" + id + "'>" + name + "</option>");
  });
  $("#selectOrg").change(function() {
    let orgid = $("#selectOrg option:selected").val();
    let currentOrg = orgs.filter(org => {
      return org._id === orgid;
    })[0];
    callback(currentOrg);
  });
}

// handle the selection of an org
function handleOrgSelect(orgInfo) {
  currentOrg = orgInfo;
  console.log("org selected");
  console.log(currentOrg);
  if (!orgInfo) {
    $(document).trigger("selectOrgOff");
    $(document).trigger("careerPathSelectOff");

    return;
  }
  $(".orgName").text(currentOrg.name);
  careerPaths = currentOrg.dataset.careerPaths;
  populateCareerPathSelect(currentUser, currentOrg);
  updateScoringDiv(currentUser, currentOrg);
  updateRadar(currentUser, currentOrg);
  updateDelta(currentUser, currentOrg);
  $(document).trigger("selectOrg");
  $("#collapseOne").collapse("show");
}

// get all the data for this OrgID
function setupOrg(orgId, callback) {
  console.log("org is " + orgId);
  let data = { id: orgId };
  $.get("/org", data, function(response, status) {
    console.log("got org");
    console.log(response);
    console.log(status);

    if (callback) {
      callback(response);
    }
  });
}

// get the user data and populate some globals
function setupUser(userId, callback) {
  console.log("user is " + userId);
  let data = { id: userId };
  $.get("/user", data, function(response, status) {
    console.log("got user");
    console.log(response);
    console.log(status);
    if (callback) {
      callback(response);
    }
  });
}

// setup the box for selection of the careerPath
function populateCareerPathSelect(user, org) {
  // nuke the exisiting curCareerPath, if it exists.
  curCareerPath = false;

  console.log("careerPaths ");
  console.log(careerPaths);
  $("#careerPathSelect")
    .find("option[value]")
    .remove();
  let option = $("<option value=''>Select Career Path...</option>").appendTo(
    "#careerPathSelect"
  );

  // careerPaths is an array of careerPath Objects
  careerPaths.forEach((path, index) => {
    console.log(path);
    path = path.label;
    let option = $("<option></option>")
      .val(path)
      .text(path)
      .appendTo("#careerPathSelect");
  });
  $("#careerPathSelect").change(evt => {
    let val = $("#careerPathSelect option:selected").val();
    console.log(val);
    $(".careerPathDisplay").text(val);
    if (!val || val === "") {
      $(document).trigger("careerPathSelectOff");
      return;
    }
    curCareerPath = careerPaths.filter(path => {
      return val == path.label;
    })[0];
    updateScoringDiv(user, org);
    updateRadar(user, org);
    updateDelta(user, org);
    updateGapPlaylist(user, org);
    $(document).trigger("careerPathSelect");
    $("#collapseTwo").collapse("show");
  });
}

// create the scoring section whenever the selections change
function updateScoringDiv(user, org) {
  console.log("update scoring div");

  // clear out all the scoring elements and rebuild
  $("#scoringElements").empty();
  $("#idealScoringElements").empty();

  if (!curCareerPath) {
    console.log("not updating scoringDiv");
    return false;
  }

  let active = false;
  // interate through the groups and create the scoring div for that group
  curCareerPath.groups.forEach(group => {
    console.log("group");

    let scoringGroupDiv = $(
      "<div class='scoringGroup card'><div class='card-body'><h3 class='facetGroupHeader card-title'></h3><h4 class='facetDesc card-subtitle'></h4></div></div>"
    ).appendTo("#scoringElements");
    $(".facetGroupHeader", scoringGroupDiv).text(group.label);
    $(".facetDesc", scoringGroupDiv).text(group.description);
    let scoringList = $("<ul class='list-group'></ul>").appendTo(
      scoringGroupDiv
    );

    let idealScoringGroupDiv = $(
      "<div class='idealScoringGroup card'><div class='card-body'><h3 class='facetGroupHeader card-title'></h3><p class='facetDesc card-subtitle'></p></div></div>"
    ).appendTo("#idealScoringElements");
    $(".facetGroupHeader", idealScoringGroupDiv).text(group.label);
    $(".facetDesc", idealScoringGroupDiv).text(group.description);
    let idealScoringList = $("<ul class='list-group'></ul>").appendTo(
      idealScoringGroupDiv
    );

    // iterate through all the competencies, skipping all that aren't selected
    group.competencies.forEach((competency, index) => {
      if (!competency.visibleForThisCareerPath) {
        console.log("competency not selected");
        return true;
      }

      let userScore = competency.myScore;
      try {
        if (user.scores) {
          userScore =
            user.scores[org._id][curCareerPath.label][competency.label];
        }
      } catch (ermsg) {
        console.log("error gettign user score for " + ermsg);
      }
      if(!userScore){
        userScore = defaultScoreValue; // this value set in schemas.js
      }
      // there is SOME competencies selected
      active = true;

      // create the div for scoring that competency
      let scoringElement = $(
        "<li class='scoringElement list-group-item'><div class='form-group'><label for='formControlRangeS" +
          index +
          "' class='facetToScoreLabel'></label> " +
          "<input class='facetScore form-control-range' id='formControlRangeS'" +
          index +
          "' type='range' min='0' max='10'></div></li>"
      ).appendTo(scoringList);
      $(".facetScore", scoringElement).val(userScore);
      $(".facetToScoreLabel", scoringElement).text(competency.label);
      $(".facetToScoreDesc", scoringElement).text(competency.description);

      // when the score is changed,
      // update the value in the data object,
      // then update the radar
      $(".facetScore", scoringElement).on("change", function(evt) {
        let value = $(evt.target).val();
        console.log(value);
        competency.myScore = value;
        if (!user) {
          user = {};
        }
        if (!user.scores) {
          user.scores = {};
        }
        if (!user.scores[org._id]) {
          user.scores[org._id] = {};
        }
        if (!user.scores[org._id][curCareerPath.label]) {
          user.scores[org._id][curCareerPath.label] = {};
        }
        try {
          user.scores[org._id][curCareerPath.label][competency.label] = value;
        } catch (ermsg) {
          console.log("error gettign user score for " + ermsg);
        }
        console.log(groups);
        updateUserScores(user, org);
        saveUserData(user, org, function() {});
        updateRadar(user, org);
        updateGapPlaylist(user, org);
      });
    });
  });

  // only active if has content
  if (active) {
    $(".scoringcard").removeClass("disabled");
  } else {
    $(".scoringcard").addClass("disabled");
  }
}

function updateDelta(user, org) {
  /* don't let the delta get openable until some content exists */
  let active = false;

  if (!curCareerPath) {
    console.log("no curCareerPath");
    return;
  }

  curCareerPath.groups.forEach(group => {
    let classname = group.scriptname + "_comps";
    $("." + classname).empty();
    let comps = group.competencies;
    comps.sort((a, b) => {
      return b.label.length - a.label.length;
    });
    comps.forEach(competency => {
      if (!competency.visibleForThisCareerPath) {
        return true;
      }

      // there are SOME competencies selected
      active = true;
      //      console.log(competency.label);
      //      console.log(classname);
      $("<span class='competency'></span>")
        .text(competency.label)
        .appendTo("." + classname)
        .append("<br/>");
    });
  });

  // only active if has content
  if (active) {
    $(".deltacard").removeClass("disabled");
  } else {
    $(".deltacard").addClass("disabled");
  }
}

// create the radar graph, from user and org data
function updateRadar(user, org) {
  let labels = [];
  let data = [];
  let idealData = [];
  let scoredLabels = [];
  let active = false;

  if (!curCareerPath) {
    console.log("not updating radar");
    return false;
  }

  curCareerPath.groups.forEach(group => {
    group.competencies.forEach(competency => {
      console.log(competency);

      let userScore = competency.myScore;
      try {
        if (user.scores) {
          userScore =
            user.scores[org._id][curCareerPath.label][competency.label];
        }
      } catch (ermsg) {
        console.log("error gettign user score for " + ermsg);
      }
      if(!userScore){
        userScore = defaultScoreValue; // this value set in schemas.js
      }
      if (competency.visibleForThisCareerPath) {
        scoredLabels.push({
          group: group.label,
          label: competency.label,
          score: userScore,
          visible: competency.visibleForThisCareerPath,
          ideal_score: competency.idealScore
        });
        active = true;
        if (userScore < competency.idealScore) {
          competency.hasGap = true;
          competency.gapSize = competency.idealScore - userScore;
        } else {
          competency.hasGap = false;
        }
      }
    });
  });

  scoredLabels.sort((itema, itemb) => {
    var cmp1 = itema.group.localeCompare(itemb.group);
    if (cmp1 !== 0) {
      return cmp1;
    }
    return itema.score - itemb.score;
  });

  labels = scoredLabels.map(item => item.label);
  data = scoredLabels.map(item => item.score);
  idealData = scoredLabels.map(item => item.ideal_score);

  console.log(labels);
  console.log(data);

  createRadar("radarcanvas", labels, data, idealData);

  // only active if has content
  if (active) {
    $(".radarcard").removeClass("disabled");
  } else {
    $(".radarcard").addClass("disabled");
  }
}

function updateGapPlaylist(user, org) {
  console.log("gapplaylsit");
  $("#gapAccordion").empty();
  let index = 0;
  let competencyList = [];
  curCareerPath.groups.forEach(group => {
    group.competencies.forEach(competency => {
      console.log(competency.label);

      if (competency.visibleForThisCareerPath && competency.hasGap) {
        console.log(competency.label);
        competencyList.push(competency);
      }
    });
  });

  competencyList.sort(function(a, b) {
    return a.gapSize - b.gapSize;
  });

  competencyList.forEach(competency => {
    index++;
    let playlistCard = $($("#gapPlaylistsTemplate").html()).appendTo(
      "#gapAccordion"
    );

    $(".card-header", playlistCard).attr("id", "gapHeading" + index);
    $(".btn-link", playlistCard).attr("data-target", "#gapCollapse" + index);
    $(".btn-link", playlistCard).attr("aria-controls", "gapCollapse" + index);
    $(".collapse", playlistCard).attr("id", "gapCollapse" + index);
    $(".collapse", playlistCard).attr("aria-labelledby", "gapHeading" + index);

    console.log(playlistCard);
    let body = $(playlistCard).find(".card-body");
    $(".collapse", playlistCard).collapse("hide");
    $(".titlebutton", playlistCard).text(competency.label);
    let list = $("<ul class='list-group'></ul>").appendTo(body);

    if (competency.playlist && typeof competency.playlist === 'object') {
      competency.playlist.forEach(playlistItem => {
        let item = $("<li class='list-group-item'></li>")
          .text(playlistItem)
          .appendTo(list);
      });
    }
  });
}

function updateUserScores(user, org) {
  console.log("updating user scores " + curCareerPath.label);
  // get the user-specific data from the group data, put in user for storage.
  if (!user) {
    user = {};
  }
  if (!user.scores) {
    user.scores = {};
  }
  if (!user.scores[org._id]) {
    user.scores[org._id] = {};
  }
  user.scores[org._id][curCareerPath.label] = {};

  curCareerPath.groups.forEach(group => {
    group.competencies.forEach(competency => {
      console.log(competency);
      user.scores[org._id][curCareerPath.label][competency.label] =
        competency.myScore;
    });
  });
  console.log(user.scores);
}

function saveUserData(user, org, callback) {
  if (!user._rev) {
    // this isn't a logged in user, so just return
    callback(null);
  }
  $.post("/user", user, function(response, status) {
    console.log("user membership updated");
    console.log(response);
    console.log(status);
    user._rev = response.rev;
    callback(response);
  });
}

///************UI SETUP FUNCTIONS ******************/

// setup accordion
function setupAccordion() {
  // don't let disabled accordions open
  $(".collapse")
    .on("hide.bs.collapse", function(e) {
      $(e.target)
        .parent()
        .addClass("collapsedcard");
    })
    .on("show.bs.collapse", function(e) {
      $(e.target)
        .parent()
        .removeClass("collapsedcard");
      return !$(e.target)
        .parent()
        .hasClass("disabled");
      //    return isMyDivEnabled(); // true or false
    });

  $(".collapse")
    .parent()
    .addClass("collapsedcard");

  $("button[aria-expanded='true']")
    .closest(".card")
    .removeClass("collapsedcard");
}

// flowtype handles dynamic font sizes
function setupFlowType() {
  $(".flowing").flowtype({
    minimum: 300,
    maximum: 1200,
    minFont: 10,
    maxFont: 40,
    fontRatio: 30
  });
}

// this sets up the dependency system, so that some sections can't open until previous sections have been completed.
function setupUIDependencies() {
  $(".startDisabled").each(function(item) {
    $("button.btn", this).attr("data-toggle", "x");
    $("button.btn", this).css("background-color", "grey");
    let depends = $(this).attr("data-depends");
    let elem = this;
    console.log("listening for " + depends);
    $(document).on(depends, function() {
      console.log("triggered", 2000);
      $("button.btn", elem).attr("data-toggle", "collapse");
      $("button.btn", elem).css("background-color", "white");
    });
    $(document).on(depends + "Off", function() {
      console.log("triggered", 2000);
      $(".collapse", elem).collapse("hide");
      $("button.btn", elem).attr("data-toggle", "x");
      $("button.btn", elem).css("background-color", "grey");
    });
  });
}

/***** Deprecated ? **********/

/*
function createFacetGroups(user, org) {
  // create the first sections where people select competencies

  // starting with the three groups:
  groups.forEach((group, groupindex) => {
    console.log(group);
    var descText =
      "Review the following 12 competencies and choose the top four which you think are most important to a legal professional's ability to " +
      group.ability;
    let newdiv = $(
      "<div class='facetGroup card'><div class='card-body'><h3 class='facetGroupHeader card-title'></h3><h4 class='facetDesc card-subtitle'></h4></div></div>"
    );
    $(".facetGroupHeader", newdiv).text(group.label);
    $(".facetDesc", newdiv).text(descText);
    $("#facetGroups").append(newdiv);

    let facetsDiv = $("<ul class='list-group'></ul>").appendTo(newdiv);

    // loop through competencies for each group
    group.competencies.forEach((competency, compindex) => {
      let facetDiv = $("<li class='facetToGroupLabel list-group-item'></li>");
      $(facetDiv).text(competency.label);
      $(facetsDiv).append(facetDiv);
      // when a competency is clicked on, mark it "selected" (or unselect),
      // update the data object with the selected value
      // then update the scoring section below.
      // and also update the delta's text.
      facetDiv.on("click", function(evt) {
        $(this).toggleClass("selected");
        $(this).toggleClass("active");
        competency.selected = $(this).hasClass("selected");
        updateScoringDiv(user, org);
        updateDelta(user, org);
        updateRadar(user, org);
        updateGapPlaylist(user, org);
      });
    });
  });
}
*/
