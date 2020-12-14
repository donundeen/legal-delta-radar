/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console



$(document).ready(function() {
  

/*
  db.info().then(function(info) {
    console.log(info);
  });  
  
  */
  
  
  console.log("hi");

  //  createRadar("radarcanvas", competencies, data);
  $(".flowing").flowtype({
    minimum: 300,
    maximum: 1200,
    minFont: 10,
    maxFont: 40,
    fontRatio: 30
  });

  populateCareerPathSelect();
  updateScoringDiv();
  updateRadar();
  updateDelta();

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
});

function populateCareerPathSelect() {
  careerPaths.forEach((path, index) => {
    console.log(path);
    let option = $("<option></option>")
      .val(path)
      .text(path)
      .appendTo("#careerPathSelect");
  });
  $("#careerPathSelect").change(evt => {
    let val = $("#careerPathSelect option:selected").val();
    console.log(val);
    curCareerPath = val;
    updateRadar();
    updateGapPlaylist();
  });
}

function createFacetGroups() {
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
        updateScoringDiv();
        updateDelta();
        updateRadar();
        updateGapPlaylist();
      });
    });
  });
}

// create the scoring section whenever the selections change
function updateScoringDiv() {
  // clear out all the scoring elements and rebuild
  $("#scoringElements").empty();
  $("#idealScoringElements").empty();
  let active = false;

  // interate through the groups and create the scoring div for that group
  groups.forEach(group => {
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
      if (!competency.selected) {
        return true;
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
      $(".facetScore", scoringElement).val(competency.score);
      $(".facetToScoreLabel", scoringElement).text(competency.label);
      $(".facetToScoreDesc", scoringElement).text(competency.description);

      // when the score is changed,
      // update the value in the data object,
      // then update the radar
      $(".facetScore", scoringElement).on("change", function(evt) {
        let value = $(evt.target).val();
        console.log(value);
        competency.score = value;
        console.log(groups);
        updateRadar();
        updateGapPlaylist();
      });

      // create the div for scoring that competency for "Ideal Candidate"
      /*
      let idealScoringElement = $(
        "<li class='scoringElement list-group-item'><span class='facetToScoreLabel'></span> : " +
          "<span class='facetToScoreDesc'></span> " +
          "<input class='facetScore' type='number' min='0' max='10'></li>"
      ).appendTo(idealScoringList);
      */
      // <label for="formControlRange">Example Range input</label>
      // <input type="range" class="form-control-range" id="formControlRange">
      /*
      let idealScoringElement = $(
        "<li class='scoringElement list-group-item'><div class='form-group'><label for='formControlRangeI" +
          index +
          "' class='facetToScoreLabel'></label> " +
          "<input class='facetScore form-control-range' id='formControlRangeI'" +
          index +
          "' type='range' min='0' max='10'></div></li>"
      ).appendTo(idealScoringList);
      $(".facetScore", idealScoringElement).val(competency.ideal_score);
      $(".facetToScoreLabel", idealScoringElement).text(competency.label);
      $(".facetToScoreDesc", idealScoringElement).text(competency.description);

      // when the score is changed,
      // update the value in the data object,
      // then update the radar
      $(".facetScore", idealScoringElement).on("change", function(evt) {
        console.log($(evt.target).val());
        let value = $(evt.target).val();
        competency.ideal_score = value;
        updateRadar();
      });
      */
    });
  });

  // only active if has content
  if (active) {
    $(".scoringcard").removeClass("disabled");
  } else {
    $(".scoringcard").addClass("disabled");
  }
}

function updateDelta() {
  /* don't let the delta get openable until some content exists */
  let active = false;

  groups.forEach(group => {
    let classname = group.scriptname + "_comps";
    $("." + classname).empty();
    let comps = group.competencies;
    comps.sort((a, b) => {
      return b.label.length - a.label.length;
    });
    comps.forEach(competency => {
      if (!competency.selected) {
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

function updateRadar() {
  let labels = [];
  let data = [];
  let idealData = [];
  let scoredLabels = [];
  let active = false;

  groups.forEach(group => {
    group.competencies.forEach(competency => {
      if (competency.selected) {
        scoredLabels.push({
          group: group.label,
          label: competency.label,
          score: competency.score,
          ideal_score: competency.idealScores[curCareerPath]
        });
        active = true;
        if (competency.score < competency.idealScores[curCareerPath]) {
          competency.hasGap = true;
          competency.gapSize = competency.idealScores[curCareerPath] - competency.score;
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

function updateGapPlaylist() {
  console.log("gapplaylsit");
  $("#gapAccordion").empty();
  let index = 0;
  let competencyList = [];
  groups.forEach(group => {
    group.competencies.forEach(competency => {
      console.log(competency.label);

      if (competency.selected && competency.hasGap) {
        console.log(competency.label);
        competencyList.push(competency);
      }
    });
  });
  
  competencyList.sort(function(a,b){
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

    competency.playlist.forEach(playlistItem => {
      let item = $("<li class='list-group-item'></li>")
        .text(playlistItem)
        .appendTo(list);
    });
  });
}

/*
  <div class="card">
    <div class="card-header" id="gapHeadingOne">
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#gapCollapseOne" aria-expanded="true" aria-controls="gapCollapseOne">
          Collapsible Group Item #1
        </button>
      </h2>
    </div>

    <div id="gapCollapseOne" class="collapse show" aria-labelledby="gapHeadingOne" data-parent="#GapAccordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>

*/





/*
var doc = {
  "_id": "mittens",
  "name": "Mittens",
  "occupation": "kitten",
  "age": 3,
  "hobbies": [
    "playing with balls of yarn",
    "chasing laser pointers",
    "lookin' hella cute"
  ]
};
db.put(doc);
*/





//db.replicate.to('https://delta-pouchdb.glitch.me/deltaradar');
